import { LIST_CATEGORIES } from "../types";

const INITIAL_STATE = {
    categories: {},
} 

export default function (state=INITIAL_STATE,action) {
    switch (action.type) {
        case LIST_CATEGORIES:
            return {...state, ...action.payload}
        default:
            return state;
    }
}