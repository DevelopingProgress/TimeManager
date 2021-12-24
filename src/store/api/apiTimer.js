import {usersCollection} from "../../database/firebase";

export  const updateTmr = async (tasks, task) => {

    let newTasks
    newTasks= tasks.map((item) => (
        item.id === task.id ? {...item, timer: item.timer - 1} : {...item}
    ))

    return {tasks: newTasks}
}

export  const updateTmrDatabase = async (user, category, project, tasks, task) => {

    const currentTask =  (await usersCollection
        .doc(user.uid)
        .collection('categories')
        .doc(category.id)
        .collection('projects')
        .doc(project.id)
        .collection('tasks')
        .doc(task.id)
        .get())
        .data()

    await usersCollection
        .doc(user.uid)
        .collection('categories')
        .doc(category.id)
        .collection('projects')
        .doc(project.id)
        .collection('tasks')
        .doc(task.id)
        .set({
            ...task,
            timeSpent:
                task.additionalTime === 0 || task.additionalTime === null || !task.additionalTime ?
                parseInt(task.timeSpent) + parseInt(task.timer) :
                parseInt(currentTask.timeSpent) + parseInt(task.additionalTime)
        })
    let newTasks
    newTasks= tasks.map((item) => (
        item.id === task.id ? {
            ...item,
            isPlaying: false,
            timeSpent:
                task.additionalTime === 0 || task.additionalTime === null || !task.additionalTime ?
                parseInt(task.timeSpent) + parseInt(task.timer) :
                parseInt(currentTask.timeSpent) + parseInt(task.additionalTime),
           additionalTime: 0

        } :
       {...item}
    ))

    return {tasks: newTasks}
}

export const addTm = async (user, category, project, tasks, task, additionalTime) => {
    await usersCollection
        .doc(user.uid)
        .collection('categories')
        .doc(category.id)
        .collection('projects')
        .doc(project.id)
        .collection('tasks')
        .doc(task.id)
        .update({
            timer: additionalTime
        })

    let newTasks = tasks.map((item) => (
        item.id === task.id ?  {...item, timer: additionalTime, additionalTime: additionalTime} : {...item}
    ))

    return {tasks: newTasks}
}

export const toggleTmr = async (user, category, project, tasks, task, isPlaying) => {
    await usersCollection
        .doc(user.uid)
        .collection('categories')
        .doc(category.id)
        .collection('projects')
        .doc(project.id)
        .collection('tasks')
        .doc(task.id)
        .update({
            isPlaying: isPlaying
        })

    let newTasks
    newTasks = tasks.map((item) => (
        item.id === task.id ? {...item, isPlaying: isPlaying} : {...item}
    ))

    return {tasks:  newTasks}
}

export  const updateSW = async (tasks, task) => {
    return {tasks: tasks.map((item) => item.id === task.id ?  {...item, timer: item.timer + 1} : {...item})}
}

export  const updateSWDatabase = async (user, category, project, tasks, task, timer) => {
        await usersCollection
            .doc(user.uid)
            .collection('categories')
            .doc(category.id)
            .collection('projects')
            .doc(project.id)
            .collection('tasks')
            .doc(task.id)
            .update({
                timer: timer
            })
}

export const preserveTmr = async (user, category, project, tasks, task, timer) => {
    await usersCollection
        .doc(user.uid)
        .collection('categories')
        .doc(category.id)
        .collection('projects')
        .doc(project.id)
        .collection('tasks')
        .doc(task.id)
        .set({
            ...task,
           timer: timer
        })
}

