import { ADD_CATEGORY, CLEAR_CATEGORIES, CLEAR_PROJECTS, LIST_CATEGORIES, LIST_PROJECTS } from "../types";

const INITIAL_STATE = {
    categories: [],
    projects: [],
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
        case ADD_CATEGORY:
            return {...state, ...action.payload}
        default:
            return state;
    }
}
