import { ADD_CATEGORY, ADD_PROJECT, ADD_TASK, CLEAR_CATEGORIES, CLEAR_PROJECTS, CLEAR_TASKS, LIST_CATEGORIES, LIST_PROJECTS, LIST_TASKS } from "../types";

const INITIAL_STATE = {
    categories: [],
    projects: [],
    tasks: [],
    error: null
} 

export default function (state=INITIAL_STATE,action) {
    switch (action.type) {
        case LIST_CATEGORIES:
            return {...state, ...action.payload} 
        case CLEAR_CATEGORIES:
            return {...state, categories: []}
        case LIST_PROJECTS:
            return {...state, ...action.payload} 
        case CLEAR_PROJECTS:
            return {...state, projects: []}
        case LIST_TASKS:
            return {...state, ...action.payload} 
        case CLEAR_TASKS:
            return {...state, tasks: []}
        case ADD_CATEGORY:
            return {...state, ...action.payload}
        case ADD_PROJECT:
            return {...state, ...action.payload}
        case ADD_TASK:
            return {...state, ...action.payload}
        default:
            return state;
    }
}
