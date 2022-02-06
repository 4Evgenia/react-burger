import { loginRequest, logoutRequest, registerRequest, tokenRequest, getUserRequest, passwordReset, passwordResetSubmit, updateUserRequest } from '../../utils/api';
import { deleteCookie, getCookie, storeTokens } from '../../utils/utils';
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from '../../models/constants';

export const FORGOT_PASSWORD_SET_EMAIL = 'FORGOT_PASSWORD_SET_EMAIL';
export const FORGOT_PASSWORD_REQUEST_SUCCESS = 'FORGOT_PASSWORD_REQUEST_SUCCESS';
export const FORGOT_PASSWORD_REQUEST_FAILED = 'FORGOT_PASSWORD_REQUEST_FAILED';
export const FORGOT_PASSWORD_SUBMIT_SUCCESS = 'FORGOT_PASSWORD_SUBMIT_SUCCESS';
export const FORGOT_PASSWORD_SUBMIT_FAILED = 'FORGOT_PASSWORD_SUBMIT_FAILED';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const TOKEN_REFRESH_SUCCESS = 'TOKEN_SUCCESS';
export const TOKEN_REFRESH_FAILED = 'TOKEN_FAILED';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const SET_USER_SUCCESS = 'SET_USER_SUCCESS';
export const SET_USER_FAILED = 'SET_USER_FAILED';
export const SET_USER_REQUEST = 'SET_USER_REQUEST';

// LOGIN
export function login(email: string, password: string) {
    return function (dispatch: any) {
        loginRequest(email, password).then((res: any) => {
            if (res && res.success) {
                storeTokens(res);
                dispatch({
                    type: LOGIN_SUCCESS,
                    user: res.user
                });
            } else {
                dispatch({
                    type: LOGIN_FAILED
                })
            }
        }).catch(e => {
            dispatch({
                type: LOGIN_FAILED
            })
        })
    };
}

// REGISTER
export function register(email: string, password: string, name: string) {
    return function (dispatch: any) {
        registerRequest(email, password, name).then(res => {
            if (res && res.success) {
                storeTokens(res);
                dispatch({
                    type: REGISTER_SUCCESS,
                    user: res.user
                });
            } else {
                dispatch({
                    type: REGISTER_FAILED
                })
            }
        }).catch(e => {
            dispatch({
                type: REGISTER_FAILED
            })
        })
    };
}

// LOGOUT
export function logout() {
    return function (dispatch: any) {
        const token = getCookie(REFRESH_TOKEN_COOKIE);
        if (token) {
            logoutRequest(token).then(res => {
                if (res && res.success) {
                    deleteCookie(ACCESS_TOKEN_COOKIE);
                    deleteCookie(REFRESH_TOKEN_COOKIE);
                    dispatch({
                        type: LOGOUT_SUCCESS
                    });
                } else {
                    dispatch({
                        type: LOGOUT_FAILED
                    })
                }
            }).catch(e => {
                dispatch({
                    type: LOGOUT_FAILED
                })
            })
        } else {
            dispatch({
                type: LOGOUT_SUCCESS
            });
        }
    };
}

// TOKEN
export function token() {
    return function (dispatch: any) {
        tokenRequest().then(res => {
            if (res && res.success) {
                console.log(res);
                dispatch({
                    type: TOKEN_REFRESH_SUCCESS
                });
            } else {
                dispatch({
                    type: TOKEN_REFRESH_FAILED
                })
            }
        }).catch(e => {
            dispatch({
                type: TOKEN_REFRESH_FAILED
            })
        })
    };
}

// GET USER
export function getUser() {
    return function (dispatch: any) {
        getUserRequest().then(res => {
            if (res && res.success) {
                dispatch({ type: GET_USER_SUCCESS, user: res.user })
            } else {
                dispatch({
                    type: GET_USER_FAILED
                })
            }
        }).catch(e => {
            dispatch({
                type: GET_USER_FAILED
            })
        })
    }
}

// SET USER
export function setUser(user: any) {
    return function (dispatch: any) {
        dispatch({ type: SET_USER_REQUEST });
        updateUserRequest(user).then(res => {
            if (res && res.success) {
                dispatch({ type: SET_USER_SUCCESS, user: res.user })
            } else {
                dispatch({
                    type: SET_USER_FAILED
                })
            }
        }).catch(e => {
            dispatch({
                type: SET_USER_FAILED
            })
        })
    }
}

// RESET PASSWORD
export function resetPasswordRequest(email: string) {
    return function (dispatch: any) {
        passwordReset(email).then(res => {
            if (res && res.success) {
                dispatch({ type: FORGOT_PASSWORD_REQUEST_SUCCESS })
            } else {
                dispatch({
                    type: FORGOT_PASSWORD_REQUEST_FAILED
                })
            }
        }).catch(e => {
            dispatch({
                type: FORGOT_PASSWORD_REQUEST_FAILED
            })
        })
    }
}

// RESET PASSWORD SUBMIT
export function resetPasswordSubmit(password: string, token: string) {
    return function (dispatch: any) {
        passwordResetSubmit(password, token).then(res => {
            if (res && res.success) {
                dispatch({ type: FORGOT_PASSWORD_SUBMIT_SUCCESS })
            } else {
                dispatch({
                    type: FORGOT_PASSWORD_SUBMIT_FAILED
                })
            }
        }).catch(e => {
            dispatch({
                type: FORGOT_PASSWORD_SUBMIT_FAILED
            })
        })
    }
}
