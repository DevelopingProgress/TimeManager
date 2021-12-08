import { AUTH_USER, CLEAR_AUTH_ERROR, CLEAR_AUTH_MESSAGE, LOGOUT_USER, PASSWORD_RESET } from "../types";

const INITIAL_STATE = {
    user: [],
    isAuth: false,
    isVerified: false,
    error: null,
    message: null
} 

export default function (state=INITIAL_STATE,action) {
    switch (action.type) {
        case AUTH_USER:
            return {...state, ...action.payload}
        case LOGOUT_USER:
            return {...state, user: [], isAuth: false}
        case CLEAR_AUTH_ERROR:
            return {...state, error: null}
        case CLEAR_AUTH_MESSAGE:
            return {...state, message: null}
        case PASSWORD_RESET:
            return {...state, ...action.payload}
        default:
            return state;
    }
}