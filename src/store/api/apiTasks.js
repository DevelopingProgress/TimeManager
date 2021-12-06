import { firebase, usersCollection } from "../../database/firebase";
import {randDarkColor} from "../../reusable/tools";


//LIST
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

export const listTsk = async(user, category, project) => {
    try {
        let tasksList = []
        const tasks = await usersCollection
            .doc(user.uid)
            .collection('categories')
            .doc(category.id)
            .collection('projects')
            .doc(project.id)
            .collection('tasks')
            .get()
        tasks.forEach(doc => {
            tasksList.push(doc.data())
        })

        

        return {tasks: tasksList}

    } catch (error) {
        return {error: error.message}
    }
}

//ADD
export const addCat = async(name, user) => {
    try {
        const newCategory  = await usersCollection.doc(user.uid).collection('categories').doc()
        if(newCategory) {
            await newCategory.set({
                id: newCategory.id,
                name: name,
                color: randDarkColor(),
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            })
        }
        return {status: 'category_added'}
    } catch (error) {
        return {error: error.message}
    }
}

export const addProj = async(user, name, category) => {
    try {
        const newProject = await usersCollection
            .doc(user.uid)
            .collection('categories')
            .doc(category.id)
            .collection('projects')
            .doc()

        if(newProject) {
            await newProject.set({
                id: newProject.id,
                name: name,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            })
        }
        return {status: 'project_added'}
    } catch (error) {
        return {error: error.message}
    }
}

export const addTsk = async(user, name, category, project, dueDate, timer) => {
    try {
        const newTask  = await usersCollection
            .doc(user.uid)
            .collection('categories')
            .doc(category.id)
            .collection('projects')
            .doc(project.id)
            .collection('tasks')
            .doc()

        if(newTask) {
            await newTask.set(
                dueDate === null && timer === null ? {
                        id: newTask.id,
                        name: name,
                        done: false,
                        color: randDarkColor(),
                        createdAt: firebase.firestore.FieldValue.serverTimestamp()
                    } :
                    {
                        id: newTask.id,
                        name: name,
                        dueDate: firebase.firestore.Timestamp.fromDate(dueDate),
                        timer: timer,
                        done: false,
                        color: randDarkColor(),
                        createdAt: firebase.firestore.FieldValue.serverTimestamp()
                    }
            )
        }
        return {status: 'task_added'}
    } catch (error) {
        return {error: error.message}
    }
}

//DELETE
export const delCat = async (user, category) => {
    try {
        await usersCollection.doc(user.uid).collection('categories').doc(category.id).delete()
        return {status: 'category_deleted'}
    } catch (error) {
        return {error: error.message}
    }
}

export const delProj= async (user, category, project) => {
    try {
        await usersCollection
            .doc(user.uid)
            .collection('categories')
            .doc(category.id)
            .collection('projects')
            .doc(project.id).delete()
        return {status: 'project_deleted'}
    } catch (error) {
        return {error: error.message}
    }
}

export const delTsk= async (user, category, project, task) => {
    try {
        await usersCollection
            .doc(user.uid)
            .collection('categories')
            .doc(category.id)
            .collection('projects')
            .doc(project.id)
            .collection('tasks')
            .doc(task.id)
            .delete()
        return {status: 'task_deleted'}
    } catch (error) {
        return {error: error.message}
    }
}

//UPDATE
export const updateCat = async (name, user, category) => {
    try {
        await usersCollection.doc(user.uid).collection('categories').doc(category.id).update({
            name: name
        })
        return {status: 'category_updated'}
    } catch (error) {
        return {error: error.message}
    }
}

export const updateProj= async (user, name, category, project) => {
    try {
        await usersCollection
            .doc(user.uid)
            .collection('categories')
            .doc(category.id)
            .collection('projects')
            .doc(project.id)
            .update({
                name: name
            })
        return {status: 'project_updated'}
    } catch (error) {
        return {error: error.message}
    }
}

export const updateTsk= async (user, name, category, project, task, dueDate, timer) => {
    try {
        const updateTask = await usersCollection
            .doc(user.uid)
            .collection('categories')
            .doc(category.id)
            .collection('projects')
            .doc(project.id)
            .collection('tasks')
            .doc(task.id)
        if(updateTask) {
            if(dueDate === null && timer === null) {
                await updateTask.set({
                    id: task.id,
                    name: name,
                    done: false,
                    color: randDarkColor(),
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                })
            } else {
                await updateTask.update({
                    name: name,
                    dueDate: firebase.firestore.Timestamp.fromDate(dueDate),
                    timer: timer,
                })
            }
        }
        return {status: 'task_updated'}
    } catch (error) {
        return {error: error.message}
    }
}