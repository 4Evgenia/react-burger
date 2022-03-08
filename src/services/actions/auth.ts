import { loginRequest, logoutRequest, registerRequest, tokenRequest, getUserRequest, passwordReset, passwordResetSubmit, updateUserRequest } from '../../utils/api';
import { deleteCookie, getCookie, storeTokens } from '../../utils/utils';
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from '../../models/constants';
import { IUser } from '../../models/models';
import { AppThunk, AppDispatch } from '../types';
import {
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    LOGOUT_FAILED,
    LOGOUT_SUCCESS,
    FORGOT_PASSWORD_REQUEST_FAILED,
    FORGOT_PASSWORD_REQUEST_SUCCESS,
    FORGOT_PASSWORD_SET_EMAIL,
    FORGOT_PASSWORD_SUBMIT_FAILED,
    FORGOT_PASSWORD_SUBMIT_SUCCESS,
    TOKEN_REFRESH_FAILED,
    TOKEN_REFRESH_SUCCESS,
    GET_USER_FAILED,
    SET_USER_FAILED,
    GET_USER_SUCCESS,
    SET_USER_SUCCESS,
    SET_USER_REQUEST
} from '../constants';

// LOGIN
export interface ILoginSuccessAction {
    readonly type: typeof LOGIN_SUCCESS;
    readonly user: IUser;
}

export interface ILoginFailedAction {
    readonly type: typeof LOGIN_FAILED;
}

export const login: AppThunk = (email: string, password: string) => (dispatch: AppDispatch) => {
    loginRequest(email, password).then(res => {
        if (res && res.success) {
            storeTokens(res);
            dispatch(loginSuccess(res.user));
        } else {
            dispatch(loginFailed());
        }
    }).catch(e => {
        dispatch(loginFailed());
    })
}

// REGISTER
export interface IRegisterSuccessAction {
    readonly type: typeof REGISTER_SUCCESS;
    readonly user: IUser;
}

export interface IRegisterFailedAction {
    readonly type: typeof REGISTER_FAILED;
}

export const register: AppThunk = (email: string, password: string, name: string) => (dispatch: AppDispatch) => {
    registerRequest(email, password, name).then(res => {
        if (res && res.success) {
            storeTokens(res);
            dispatch(registerSuccess(res.user));
        } else {
            dispatch(registerFailed());
        }
    }).catch(e => {
        dispatch(registerFailed());
    })
}

// LOGOUT
export interface ILogoutSuccessAction {
    readonly type: typeof LOGOUT_SUCCESS;
}

export interface ILogoutFailedAction {
    readonly type: typeof LOGOUT_FAILED;
}

export const logout: AppThunk = () => (dispatch: AppDispatch) => {
    const token = getCookie(REFRESH_TOKEN_COOKIE);
    if (token) {
        deleteCookie(ACCESS_TOKEN_COOKIE);
        deleteCookie(REFRESH_TOKEN_COOKIE);
        logoutRequest(token).then(res => {
            if (res && res.success) {
                dispatch(logoutSuccess());
            } else {
                dispatch(logoutFailed());
            }
        }).catch(e => {
            dispatch(logoutFailed());
        })
    } else {
        dispatch(logoutSuccess());
    }
}

// TOKEN

export interface ITokenRefreshSuccessAction {
    readonly type: typeof TOKEN_REFRESH_SUCCESS;
}

export interface ITokenRefreshFailedAction {
    readonly type: typeof TOKEN_REFRESH_FAILED;
}

export const token: AppThunk = () => (dispatch: AppDispatch) => {
    tokenRequest().then(res => {
        if (res && res.success) {
            dispatch(tokenRefreshSuccess());
        } else {
            dispatch(tokenRefreshFailed());
        }
    }).catch(e => {
        dispatch(tokenRefreshFailed());
    })
}

// GET USER

export interface IGetUserSuccessAction {
    readonly type: typeof GET_USER_SUCCESS;
    readonly user: IUser;
}

export interface IGetUserFailedAction {
    readonly type: typeof GET_USER_FAILED;
}

export const getUser: AppThunk = () => (dispatch: AppDispatch) => {
    getUserRequest().then(res => {
        if (res && res.success) {
            dispatch(getUserSuccess(res.user));
        } else {
            dispatch(getUserFailed());
        }
    }).catch(e => {
        dispatch(getUserFailed());
    })
}

// SET USER

export interface ISetUserSuccessAction {
    readonly type: typeof SET_USER_SUCCESS;
    readonly user: IUser;
}

export interface ISetUserFailedAction {
    readonly type: typeof SET_USER_FAILED;
}

export interface ISetUserRequestAction {
    readonly type: typeof SET_USER_REQUEST;
}

export const setUser: AppThunk = (user: IUser) => (dispatch: AppDispatch) => {
    dispatch(setUserRequest());
    updateUserRequest(user).then(res => {
        if (res && res.success) {
            dispatch(setUserSuccess(res.user))
        } else {
            dispatch(setUserFailed());
        }
    }).catch(e => {
        dispatch(setUserFailed());
    })
}

// RESET PASSWORD

export interface IForgotPasswordSuccessAction {
    readonly type: typeof FORGOT_PASSWORD_REQUEST_SUCCESS;
}

export interface IForgotPasswordFailedAction {
    readonly type: typeof FORGOT_PASSWORD_REQUEST_FAILED;
}

export interface IForgotPasswordSetEmail {
    readonly type: typeof FORGOT_PASSWORD_SET_EMAIL;
    readonly email: string;
}

export const resetPasswordRequest: AppThunk = (email: string) => (dispatch: AppDispatch) => {
    passwordReset(email).then(res => {
        if (res && res.success) {
            dispatch(forgotPasswordSuccess())
        } else {
            dispatch(forgotPasswordFailed());
        }
    }).catch(e => {
        dispatch(forgotPasswordFailed());
    })
}

// RESET PASSWORD SUBMIT
export interface IForgotPasswordSubmitSuccessAction {
    readonly type: typeof FORGOT_PASSWORD_SUBMIT_SUCCESS;
}

export interface IForgotPasswordSubmitFailedAction {
    readonly type: typeof FORGOT_PASSWORD_SUBMIT_FAILED;
}

export const resetPasswordSubmit: AppThunk = (password: string, token: string) => (dispatch: AppDispatch) => {
    passwordResetSubmit(password, token).then(res => {
        if (res && res.success) {
            dispatch(forgotasswordSubmitSuccess());
        } else {
            dispatch(forgotasswordSubmitFailed());
        }
    }).catch(e => {
        dispatch(forgotasswordSubmitFailed());
    })
}

// Генераторы экшенов
export const loginSuccess = (user: IUser): ILoginSuccessAction => ({
    type: LOGIN_SUCCESS,
    user
});

export const loginFailed = (): ILoginFailedAction => ({
    type: LOGIN_FAILED
});

export const registerSuccess = (user: IUser): IRegisterSuccessAction => ({
    type: REGISTER_SUCCESS,
    user
});

export const registerFailed = (): IRegisterFailedAction => ({
    type: REGISTER_FAILED
});

export const logoutSuccess = (): ILogoutSuccessAction => ({
    type: LOGOUT_SUCCESS
});

export const logoutFailed = (): ILogoutFailedAction => ({
    type: LOGOUT_FAILED
});

export const tokenRefreshSuccess = (): ITokenRefreshSuccessAction => ({
    type: TOKEN_REFRESH_SUCCESS
});

export const tokenRefreshFailed = (): ITokenRefreshFailedAction => ({
    type: TOKEN_REFRESH_FAILED
});

export const getUserSuccess = (user: IUser): IGetUserSuccessAction => ({
    type: GET_USER_SUCCESS,
    user
});

export const getUserFailed = (): IGetUserFailedAction => ({
    type: GET_USER_FAILED
});

export const setUserSuccess = (user: IUser): ISetUserSuccessAction => ({
    type: SET_USER_SUCCESS,
    user
});

export const setUserFailed = (): ISetUserFailedAction => ({
    type: SET_USER_FAILED
});

export const setUserRequest = (): ISetUserRequestAction => ({
    type: SET_USER_REQUEST
});

export const forgotPasswordSuccess = (): IForgotPasswordSuccessAction => ({
    type: FORGOT_PASSWORD_REQUEST_SUCCESS
});

export const forgotPasswordFailed = (): IForgotPasswordFailedAction => ({
    type: FORGOT_PASSWORD_REQUEST_FAILED
});

export const forgotPasswordSetEmail = (email: string): IForgotPasswordSetEmail => ({
    type: FORGOT_PASSWORD_SET_EMAIL,
    email
});

export const forgotasswordSubmitSuccess = (): IForgotPasswordSubmitSuccessAction => ({
    type: FORGOT_PASSWORD_SUBMIT_SUCCESS
});

export const forgotasswordSubmitFailed = (): IForgotPasswordSubmitFailedAction => ({
    type: FORGOT_PASSWORD_SUBMIT_FAILED
});

export type TAuthActions = ILoginSuccessAction
    | ILoginFailedAction
    | IForgotPasswordFailedAction
    | IForgotPasswordSuccessAction
    | IForgotPasswordSetEmail
    | IForgotPasswordSubmitFailedAction
    | IForgotPasswordSubmitSuccessAction
    | IRegisterFailedAction
    | IRegisterSuccessAction
    | ILogoutFailedAction
    | ILogoutSuccessAction
    | ISetUserFailedAction
    | ISetUserRequestAction
    | ISetUserSuccessAction
    | IGetUserFailedAction
    | ITokenRefreshFailedAction
    | ITokenRefreshSuccessAction
    | IGetUserSuccessAction;
