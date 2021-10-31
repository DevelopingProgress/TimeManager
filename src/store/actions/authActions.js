import { login, loginFacebook, loginGoogle, register, autoLogin, logout } from "../api/apiAuth"
import { AUTH_USER, LOGOUT_USER } from "../types"

export const registerUser = (values) => ({
    type: AUTH_USER,
    payload: register(values)
})

export const loginUser = (values) => ({
    type: AUTH_USER,
    payload: login(values)
})

export const loginFacebookUser = () => ({
    type: AUTH_USER,
    payload: loginFacebook()
})

export const loginGoogleUser = () => ({
    type: AUTH_USER,
    payload: loginGoogle()
})

export const autoLoginUser = () => ({
    type: AUTH_USER,
    payload: autoLogin()
})

export const logoutUser = () => ({
    type: LOGOUT_USER,
    payload: logout()
})