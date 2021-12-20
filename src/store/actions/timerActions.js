import {ADD_TIMER, UPDATE_TIMER} from "../types";
import {addTimerToTask, addTm, addTmSpent, updateTmr, updateTmrDatabase} from "../api/apiTimer";


export const addTimer  = (timers, task, counter) => ({
    type: ADD_TIMER,
    payload: addTimerToTask(timers, task, counter)
})

export const updateTimer  = (tasks, task) => ({
    type: UPDATE_TIMER,
    payload: updateTmr(tasks, task)
})

export const updateTimerDatabase  = (user, category, project, tasks, task, timer, additionalTime) => ({
    type: UPDATE_TIMER,
    payload: updateTmrDatabase(user, category, project, tasks, task, timer, additionalTime)
})

export const addTime = (user, category, project, tasks, task, additionalTime) => ({
    type: UPDATE_TIMER,
    payload: addTm(user, category, project, tasks, task, additionalTime)
})

