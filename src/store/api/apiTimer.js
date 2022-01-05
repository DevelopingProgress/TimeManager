import {usersCollection} from "../../database/firebase";

const taskAwait = (user, category, project, task)  =>
    usersCollection
    .doc(user.uid)
    .collection('categories')
    .doc(category.id)
    .collection('projects')
    .doc(project.id)
    .collection('tasks')
    .doc(task.id)

export  const updateTmr = async (tasks, task) => {

    let newTasks
    newTasks= tasks.map((item) => (
        item.id === task.id ? {...item, timer: item.timer - 1} : {...item}
    ))

    return {tasks: newTasks}
}

export  const updateTmrDatabase = async (user, category, project, tasks, task, additionalTime) => {

    const previousTask = (await taskAwait(user, category, project, task).get()).data()

    await taskAwait(user, category, project, task).set({
        ...task,
        timeSpent: additionalTime === 0 ? parseInt(task.timer) : (parseInt(previousTask.timeSpent) + parseInt(additionalTime))
    })
}

export const addTm = async (user, category, project, tasks, task, additionalTime) => {
    await taskAwait(user, category, project, task)
        .update({
            timer: additionalTime,
            additionalTime: additionalTime
        })

    const newTask = (await taskAwait(user, category, project, task).get()).data()

    let newTasks = tasks.map((item) => (
        item.id === task.id ?  newTask : {...item}
    ))

    return {tasks: newTasks}
}

export const toggleTmr = async (user, category, project, tasks, task, isPlaying) => {

    await taskAwait(user, category, project, task).update({isPlaying: isPlaying})

    let newTasks
    newTasks = tasks.map((item) => (
        item.id === task.id ? {...item, isPlaying: isPlaying} : {...item}
    ))

    return {tasks:  newTasks, loading: false}
}

export  const updateSW = async (tasks, task) => {
    return {tasks: tasks.map((item) => item.id === task.id ?  {...item, timer: item.timer + 1} : {...item})}
}

export  const updateSWDatabase = async (user, category, project, tasks, task, timer) => {
        await taskAwait(user, category, project, task).update({timer: timer})
}

export const preserveTmr = async (user, category, project, tasks, task, timer, additionalTime, timeSpent) => {
    await taskAwait(user, category, project, task).set({...task, timer: timer, additionalTime: additionalTime, timeSpent: timeSpent, isPlaying: false})
    return {loading: false}
}
