import {ADD_TIME, PRESERVE_TIMER, TOGGLE_TIMER, UPDATE_TIMER, UPDATE_TIMER_DATABASE} from "../types";
import {addTm, preserveTmr, toggleTmr, updateSW, updateSWDatabase, updateTmr, updateTmrDatabase} from "../api/apiTimer";

export const updateTimer  = (tasks, task) => ({
    type: UPDATE_TIMER,
    payload: updateTmr(tasks, task)
})

export const updateStopwatch  = (tasks, task) => ({
    type: UPDATE_TIMER,
    payload: updateSW(tasks, task)
})

export const updateTimerDatabase  = (user, category, project, tasks, task, additionalTime) => ({
    type: UPDATE_TIMER_DATABASE,
    payload: updateTmrDatabase(user, category, project, tasks, task, additionalTime)
})

export const addTime = (user, category, project, tasks, task, additionalTime) => ({
    type: ADD_TIME,
    payload: addTm(user, category, project, tasks, task, additionalTime)
})

export const toggleTimer = (user, category, project, tasks, task, isPlaying) => ({
    type: TOGGLE_TIMER,
    payload: toggleTmr(user, category, project, tasks, task, isPlaying)
})

export const updateStopWatchDatabase  = (user, category, project, tasks, task, timer) => ({
    type: UPDATE_TIMER_DATABASE,
    payload: updateSWDatabase(user, category, project, tasks, task, timer)
})

export const preserveTimer  = (user, category, project, tasks, task, timer, additionalTime, timeSpent) => ({
    type: PRESERVE_TIMER,
    payload: preserveTmr(user, category, project, tasks, task, timer, additionalTime, timeSpent)
})


