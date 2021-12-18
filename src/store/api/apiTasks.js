import { firebase, usersCollection } from "../../database/firebase";
import {randDarkColor} from "../../reusable/utils/tools";


//LIST
export const listCat = async(user) => {
    try {

        let categoriesList = []
        const categories = await usersCollection
            .doc(user.uid)
            .collection('categories')
            .orderBy("createdAt", "asc")
            .get()

        categories.forEach(doc => {
            categoriesList.push(doc.data())
        })

        return {categories: categoriesList, status: 'categories_listed'}
    } catch (error) {
        return {error: "Problem z wyświetleniem listy kategorii."}
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
        .orderBy("createdAt", "asc")
        .get()
        projects.forEach(doc => {
            projectsList.push(doc.data())
        })

        return {projects: projectsList, status: 'projects_listed'}
    } catch (error) {
        return {error: "Problem z wyświetleniem listy projektów."}
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
            .orderBy("createdAt", "asc")
            .get()

        tasks.forEach(doc => {
            tasksList.push(doc.data())
        })

        return {tasks: tasksList, status: 'tasks_listed'}

    } catch (error) {
        return {error: "Problem z wyświetleniem listy zadań."}
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
        return {status: 'category_added', message: "Dodano kategorię."}
    } catch (error) {
        return {error: "Problem przy dodawaniu kategorii."}
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
        return {status: 'project_added', message: "Dodano projekt."}
    } catch (error) {
        return {error: "Problem przy dodawaniu projektu."}
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
        return {status: 'task_added', message: "Dodano zadanie."}
    } catch (error) {
        return {error: "Problem przy dodawaniu zadania."}
    }
}

//DELETE
export const delCat = async (user, category) => {
    try {
        await usersCollection.doc(user.uid).collection('categories').doc(category.id).delete()
        return {status: 'category_deleted', message: "Usunięto  kategorię."}
    } catch (error) {
        return {error: "Problem przy usuwaniu  kategorii."}
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
        return {status: 'project_deleted', message: "Usunięto  projekt."}
    } catch (error) {
        return {error: "Problem przy usuwaniu  projektu."}
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
        return {status: 'task_deleted', message: "Usunięto  zadanie."}
    } catch (error) {
        return {error: "Problem przy usuwaniu  zadania."}
    }
}

//UPDATE
export const updateCat = async (name, user, category) => {
    try {
        await usersCollection.doc(user.uid).collection('categories').doc(category.id).update({
            name: name
        })
        return {status: 'category_updated', message: "Zaktualizowano  kategorię."}
    } catch (error) {
        return {error: "Problem przy aktualizacji  kategorii."}
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
        return {status: 'project_updated', message: "Zaktualizowano  projekt."}
    } catch (error) {
        return {error: "Problem przy aktualizacji  projektu."}
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
        return {status: 'task_updated', message: "Zaktualizowano  zadanie."}
    } catch (error) {
        return {error: "Problem przy aktualizacji  zadania."}
    }
}

//END TASK
export const endTsk = async (user, category, project, task, endDate) => {
    try {
        const endTask = await usersCollection
            .doc(user.uid)
            .collection('categories')
            .doc(category.id)
            .collection('projects')
            .doc(project.id)
            .collection('tasks')
            .doc(task.id)
        if(endTask) {
            await endTask.update('done', true)
            await endTask.set({endDate: firebase.firestore.Timestamp.fromDate(endDate)}, {merge: true})
        }
        return {status: 'task_ended', message: "Ukończono  zadanie."}
    } catch (error) {
        return {error: "Problem przy ukończeniu  zadania."}
    }
}

export const endNoDateTsk = async (user, category, project, task, endDate, timer) => {
    try {
        const endNoDateTask = await usersCollection
            .doc(user.uid)
            .collection('categories')
            .doc(category.id)
            .collection('projects')
            .doc(project.id)
            .collection('tasks')
            .doc(task.id)
        if(endNoDateTask) {
            await endNoDateTask.update('done', true)
            await endNoDateTask.set({
                endDate: firebase.firestore.Timestamp.fromDate(endDate),
                timer: timer
            }, {merge: true})
        }
        return {status: 'task_ended', message: "Ukończono  zadanie."}
    } catch (error) {
        return {error: "Problem przy ukończeniu  zadania."}
    }
}
