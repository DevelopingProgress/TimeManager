import { login, loginFacebook, loginGoogle, register, autoLogin, logout, passwordReset } from "../api/apiAuth"
import { AUTH_USER, CLEAR_AUTH_ERROR, CLEAR_AUTH_MESSAGE, LOGOUT_USER, PASSWORD_RESET } from "../types"

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

export const clearAuthError = () => ({
    type: CLEAR_AUTH_ERROR
})

export const clearAuthMessage = () => ({
    type: CLEAR_AUTH_MESSAGE
})

export const passwordResetUser = (email) => ({
    type: PASSWORD_RESET,
    payload: passwordReset(email)
})