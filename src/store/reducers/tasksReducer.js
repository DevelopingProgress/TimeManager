import { CLEAR_CATEGORIES, LIST_CATEGORIES } from "../types";

const INITIAL_STATE = {
    categories: [],
    error: null
} 

export default function (state=INITIAL_STATE,action) {
    switch (action.type) {
        case LIST_CATEGORIES:
            return {...state, ...action.payload} 
        case CLEAR_CATEGORIES:
            return {...state, categories: []}
        default:
            return state;
    }
}
