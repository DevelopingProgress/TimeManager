import {usersCollection} from "../../database/firebase";

export  const updateTmr = async (tasks, task) => {
    return {tasks: tasks.map((item) => item.id === task.id && {...item, timer: item.timer - 1})}
}

export  const updateTmrDatabase = async (user, category, project, tasks, task, timer) => {
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
