import {
    ADD_CATEGORY,
    ADD_PROJECT,
    ADD_TASK,
    CLEAR_CATEGORIES, CLEAR_ERROR,
    CLEAR_PROJECTS, CLEAR_STATUS,
    CLEAR_TASKS, DELETE_CATEGORY, DELETE_PROJECT, DELETE_TASK,
    LIST_CATEGORIES,
    LIST_PROJECTS,
    LIST_TASKS
} from "../types";

const INITIAL_STATE = {
    categories: [],
    projects: [],
    tasks: [],
    error: null
}

export default function (state=INITIAL_STATE,action) {
    switch (action.type) {
        //LIST
        case LIST_CATEGORIES:
            return {...state, ...action.payload}
        case LIST_PROJECTS:
            return {...state, ...action.payload}
        case LIST_TASKS:
            return {...state, ...action.payload}

        //ADD
        case ADD_CATEGORY:
            return {...state, ...action.payload}
        case ADD_PROJECT:
            return {...state, ...action.payload}
        case ADD_TASK:
            return {...state, ...action.payload}

        //DELETE
        case DELETE_CATEGORY:
            return {...state, ...action.payload}
        case  DELETE_PROJECT:
            return {...state, ...action.payload}
        case DELETE_TASK:
            return {...state, ...action.payload}

        //UPDATE


        //CLEAR
        case CLEAR_CATEGORIES:
            return {...state, categories: []}
        case CLEAR_PROJECTS:
            return {...state, projects: []}
        case CLEAR_TASKS:
            return {...state, tasks: []}
        case CLEAR_STATUS:
            return {...state, status: []}
        case CLEAR_ERROR:
            return {...state, error: null}

        default:
            return state;
    }
}
