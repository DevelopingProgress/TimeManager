import { AUTH_USER } from "../types";

const INITIAL_STATE = {
    user: [],
    isAuth: false,
    error: null
} 

export default function (state=INITIAL_STATE,action) {
    switch (action.type) {
        case AUTH_USER:
            return {...state, ...action.payload}
        default:
            return state;
    }
}