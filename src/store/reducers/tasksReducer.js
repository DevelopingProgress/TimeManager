import {
    ADD_CATEGORY,
    ADD_PROJECT,
    ADD_TASK,
    ADD_TIME,
    ADD_TIMER,
    CLEAR_CATEGORIES,
    CLEAR_ERROR,
    CLEAR_MESSAGE,
    CLEAR_PROJECTS,
    CLEAR_STATUS,
    CLEAR_TASKS,
    DELETE_CATEGORY,
    DELETE_PROJECT,
    DELETE_TASK,
    END_TASK,
    LIST_CATEGORIES,
    LIST_PROJECTS,
    LIST_TASKS,
    LOADING,
    PRESERVE_TIMER,
    TOGGLE_TIMER,
    UPDATE_CATEGORY,
    UPDATE_PROJECT,
    UPDATE_TASK,
    UPDATE_TIMER,
    UPDATE_TIMER_DATABASE
} from "../types";

const INITIAL_STATE = {
    categories: [],
    projects: [],
    tasks: [],
    additionalTime: 0,
    loading: false,
    error: null,
    message: null
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
        case ADD_TIME:
            return {...state, ...action.payload}
        case LOADING:
            return {...state, loading: true}

        //DELETE
        case DELETE_CATEGORY:
            return {...state, ...action.payload}
        case  DELETE_PROJECT:
            return {...state, ...action.payload}
        case DELETE_TASK:
            return {...state, ...action.payload}

        //UPDATE
        case UPDATE_CATEGORY:
            return {...state, ...action.payload}
        case  UPDATE_PROJECT:
            return {...state, ...action.payload}
        case UPDATE_TASK:
            return {...state, ...action.payload}
        case UPDATE_TIMER:
            return {...state, ...action.payload}
        case UPDATE_TIMER_DATABASE:
            return {...state, ...action.payload}

        //TASK ACTIONS
        case TOGGLE_TIMER:
            return {...state, ...action.payload}
        case PRESERVE_TIMER:
            return {...state, ...action.payload}
        case END_TASK:
            return {...state, ...action.payload}

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
        case CLEAR_MESSAGE:
            return {...state, message: null}

        default:
            return state;
    }
}
