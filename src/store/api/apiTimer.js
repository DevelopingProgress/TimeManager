import {usersCollection} from "../../database/firebase";

export  const updateTmr = async (tasks, task) => {
    return {tasks: tasks.map((item) => item.id === task.id && {...item, timer: item.timer - 1})}
}

export  const updateTmrDatabase = async (user, category, project, tasks, task, timer, additionalTime) => {
    if(additionalTime !== null) {
        const overallTimeSpent = timer + additionalTime
        await usersCollection
            .doc(user.uid)
            .collection('categories')
            .doc(category.id)
            .collection('projects')
            .doc(project.id)
            .collection('tasks')
            .doc(task.id)
            .update({
                timeSpent: overallTimeSpent,
                timer: additionalTime
            })
    } else {
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
    return {tasks: tasks.map((item) => item.id === task.id && {...item, timer: additionalTime})}
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
    return {tasks: tasks.map((item) => item.id === task.id && {...item, isPlaying: isPlaying})}
}

export  const updateSW = async (tasks, task) => {
    return {tasks: tasks.map((item) => item.id === task.id && {...item, timer: item.timer + 1})}
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

