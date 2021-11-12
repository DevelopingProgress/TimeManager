import { categoriesCollection, projectsCollection, usersCollection, firebase, tasksCollection, } from "../../database/firebase";

export const listCat = async(user) => {
    try {

        let categoriesList = []
        const categories = await usersCollection.doc(user.uid).collection('categories').get()

        categories.forEach(doc => {
            categoriesList.push(doc.data()) 
        })
        
        return {categories: categoriesList}
    } catch (error) {
        return {error: error.message}
    }

}

export const listProj = async(user, category) => {
    try {
        let projectsList = []
        const projects = await usersCollection
        .doc(user.uid)
        .collection('categories')
        .doc(category.id)
        .collection('projects')
        .get()
        projects.forEach(doc => {
            projectsList.push(doc.data())
        })
        
        return {projects: projectsList}
    } catch (error) {
        return {error: error.message}
    }
}

export const listTsk = async(projectID) => {
    try {
        const project = await projectsCollection.doc(projectID).get()
        const data = project.data()
        let tasks = []
        for (let i = 0; i < data.tasks.length; i++) {
            if(data.tasks) {
                let projectTask = await data.tasks[i].get()
                tasks.push(projectTask.data())
            }
        }
        return {tasks: tasks}

    } catch (error) {
        return {error: error.message}
    }
}


export const addCat = async(name, icon, user) => {
    try {
        const newCategory = await categoriesCollection.doc()

        const uid = user.uid
        if(newCategory) {
            newCategory.set({
                id: newCategory.id,
                name: name,
                projects: []
            })
            const ref = categoriesCollection.doc(newCategory.id)
            await usersCollection.doc(uid).update({
                categories: firebase.firestore.FieldValue.arrayUnion(ref)
            })
        }

        return {status: 'category_added'}

    } catch (error) {
        return {error: error.message}
    }
}

export const addProj = async(name, category) => {
    try {
        const categoryList = await categoriesCollection.where('name', '==', category).get()
        for (let i = 0; i < categoryList.docs.length; i++) {
            const cat = categoryList.docs[i].data()

            const newProject = await projectsCollection.doc()

            if(newProject) {
                newProject.set({
                    id: newProject.id,
                    name: name,
                    tasks: []
                })
                const ref = projectsCollection.doc(newProject.id)
                await categoriesCollection.doc(cat.id).update({
                    projects: firebase.firestore.FieldValue.arrayUnion(ref)
                })
            }
        }

        return {status: 'project_added'}

    } catch (error) {
        return {error: error.message}
    }
}

export const addTsk = async(name, project) => {
    try {
        const projectList = await projectsCollection.where('name', '==', project).get()
        for (let i = 0; i < projectList.docs.length; i++) {
            const proj = projectList.docs[i].data()

            const newTask = await tasksCollection.doc()

            if(newTask) {
                newTask.set({
                    id: newTask.id,
                    name: name,
                })
                const ref = tasksCollection.doc(newTask.id)
                await projectsCollection.doc(proj.id).update({
                    tasks: firebase.firestore.FieldValue.arrayUnion(ref)
                })
            }
        }

        return {status: 'task_added'}

    } catch (error) {
        return {error: error.message}
    }
}
