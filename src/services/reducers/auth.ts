import {
    FORGOT_PASSWORD_SET_EMAIL,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    LOGOUT_FAILED,
    LOGOUT_SUCCESS,
    REGISTER_FAILED,
    REGISTER_SUCCESS,
    TOKEN_REFRESH_FAILED,
    TOKEN_REFRESH_SUCCESS,
    GET_USER_FAILED,
    GET_USER_SUCCESS,
    SET_USER_SUCCESS,
    SET_USER_FAILED,
    SET_USER_REQUEST,
    FORGOT_PASSWORD_REQUEST_SUCCESS,
    FORGOT_PASSWORD_REQUEST_FAILED,
    FORGOT_PASSWORD_SUBMIT_SUCCESS,
    FORGOT_PASSWORD_SUBMIT_FAILED
} from '../actions/auth';

const initialState = {
    email: '',
    user: null,
    loginSuccess: false,
    loginFailed: false,
    registerSuccess: false,
    registerFailed: false,
    logoutSuccess: false,
    logoutFailed: false,
    tokenSuccess: false,
    tokenFailed: false,
    accessToken: null,
    getUserSuccess: false,
    getUserFailed: false,
    forgotPasswordRequestSuccess: false,
    forgotPasswordRequestFailed: false,
    forgotPasswordSubmitSuccess: false,
    forgotPasswordSubmitFailed: false,
    setUserSuccess: false,
    setUserFailed: false
}

export const authReducer = (state = initialState, action:any) => {
    switch(action.type){
        case FORGOT_PASSWORD_SET_EMAIL: {
            return{
                ...state, email: action.email
            }
        }
        case FORGOT_PASSWORD_REQUEST_SUCCESS:{
            return{
                ...state, forgotPasswordRequestSuccess: true, forgotPasswordRequestFailed: false
            }
        }
        case FORGOT_PASSWORD_REQUEST_FAILED: {
            return{
                ...state, forgotPasswordRequestFailed: true, forgotPasswordRequestSuccess: false
            }
        }
        case FORGOT_PASSWORD_SUBMIT_SUCCESS: {
            return{
                ...state, forgotPasswordSubmitSuccess: true, forgotPasswordSubmitFailed: false
            }
        }
        case FORGOT_PASSWORD_SUBMIT_FAILED: {
            return{
                ...state, forgotPasswordSubmitSuccess: false, forgotPasswordSubmitFailed: true
            }
        }
        case LOGIN_SUCCESS: {
            return{
                ...state, loginSuccess:true, user: action.user, loginFailed:false
            }
        }
        case LOGIN_FAILED: {
            return{
                ...state, loginFailed:true, loginSuccess:false
            }
        }
        case REGISTER_SUCCESS: {
            return{
                ...state, registerSuccess:true, user: action.user, registerFailed:false
            }
        }
        case REGISTER_FAILED: {
            return{
                ...state, registerFailed:true, registerSuccess:false
            }
        }
        case LOGOUT_SUCCESS: {
            return{
                ...state, logoutSuccess:true, user: null, logoutFailed:false
            }
        }
        case LOGOUT_FAILED: {
            return{
                ...state, logoutFailed:true, logoutSuccess:false
            }
        }
        case TOKEN_REFRESH_SUCCESS: {
            return{
                ...state, tokenSuccess:true, tokenFailed:false
            }
        }
        case TOKEN_REFRESH_FAILED: {
            return{
                ...state, tokenFailed:true, tokenSuccess:false
            }
        }
        case GET_USER_SUCCESS: {
            return {
                ...state, getUserSuccess: true, getUserFailed: false, user: action.user
            }
        }
        case GET_USER_FAILED: {
            return {
                ...state, getUserSuccess: false, getUserFailed: true
            }
        }
        case SET_USER_SUCCESS: {
            return {
                ...state, setUserSuccess: true, setUserFailed: false, user: action.user
            }
        }
        case SET_USER_FAILED: {
            return {
                ...state, setUserSuccess: false, setUserFailed: true
            }
        }
        case SET_USER_REQUEST:{
            return {
                ...state, setUserSuccess: false, setUserFailed: false
            }
        }
        default: {
            return state;
        }
    }
}