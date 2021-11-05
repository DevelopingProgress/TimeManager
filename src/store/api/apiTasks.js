import { categoriesCollection, projectsCollection, usersCollection, firebase, tasksCollection, } from "../../database/firebase";

export const listCat = async(user) => {
    try {
        const userProfile = await usersCollection.doc(user.uid).get();
        const data = userProfile.data();
        let categoriesList = []
        for (var i = 0; i < data.categories.length; i++) {
            if(data.categories) {
                let userCategory = await data.categories[i].get()
                categoriesList.push(userCategory.data())
            }
        }
        return {categories: categoriesList}
    } catch (error) {
        return {error: error.message}
    }
    
}

export const listProj = async(categories) => {
    try {
        let projects = []
        for (var i = 0; i < categories.length; i++) {
            for (var j = 0; j < categories[i].projects.length; j++) {
                if(categories[i].projects) {
                    let categoryProject = await categories[i].projects[j].get()
                    projects.push(categoryProject.data())
                }
            }
        }
        return {projects: projects}
        
    } catch (error) {
        return {error: error.message}
    }  
}

export const listTsk = async(projects) => {
    try {
        let tasks = []
        for (var i = 0; i < projects.length; i++) {
            for (var j = 0; j < projects[i].tasks.length; j++) {
                if(projects[i].tasks) {
                    let projectTask = await projects[i].tasks[j].get()
                    tasks.push(projectTask.data())
                }
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
                catID: newCategory.id,
                name: name,
                icon: icon,
                projects: []
            })
            const ref = categoriesCollection.doc(newCategory.id)
            await usersCollection.doc(uid).update({
                categories: firebase.firestore.FieldValue.arrayUnion(ref)
            })
        }
    } catch (error) {
        return {error: error.message}
    }
}

export const addProj = async(name, category) => {
    try {
        const categoryList = await categoriesCollection.where('name', '==', category).get()
        for (var i = 0; i < categoryList.docs.length; i++) {
            const cat = categoryList.docs[i].data()
            
            const newProject = await projectsCollection.doc()

            if(newProject) {
                newProject.set({
                    projID: newProject.id,
                    name: name,
                    icon: cat.icon,
                    tasks: []
                })
                const ref = projectsCollection.doc(newProject.id)
                await categoriesCollection.doc(cat.catID).update({
                    projects: firebase.firestore.FieldValue.arrayUnion(ref)
                })
            }
        }
        
    } catch (error) {
        return {error: error.message}
    }
}

export const addTsk = async(name, project) => {
    try {
        const projectList = await projectsCollection.where('name', '==', project).get()
        for (var i = 0; i < projectList.docs.length; i++) {
            const proj = projectList.docs[i].data()
            
            const newTask = await tasksCollection.doc()

            if(newTask) {
                newTask.set({
                    taskID: newTask.id,
                    name: name,
                })
                const ref = tasksCollection.doc(newTask.id)
                await projectsCollection.doc(proj.projID).update({
                    tasks: firebase.firestore.FieldValue.arrayUnion(ref)
                })
            }
        }
        
    } catch (error) {
        return {error: error.message}
    }
}