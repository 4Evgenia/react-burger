import {
    FORGOT_PASSWORD_SET_EMAIL,
    LOGIN_FAILED,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_FAILED,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    REGISTER_FAILED,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    TOKEN_FAILED,
    TOKEN_REQUEST,
    TOKEN_SUCCESS
} from '../actions/auth';

const initialState = {
    email: '',
    user: null,
    loginRequest: false,
    loginSuccess: false,
    loginFailed: false,
    registerRequest: false,
    registerSuccess: false,
    registerFailed: false,
    logoutRequest: false,
    logoutSuccess: false,
    logoutFailed: false,
    tokenRequest: false,
    tokenSuccess: false,
    tokenFailed: false,
    accessToken: null
}

export const authReducer = (state = initialState, action:any) => {
    switch(action.type){
        case FORGOT_PASSWORD_SET_EMAIL: {
            return{
                ...state, email: action.email
            }
        }
        case LOGIN_REQUEST: {
            return{
                ...state, loginRequest:true
            }
        }
        case LOGIN_SUCCESS: {
            return{
                ...state, loginRequest:false, loginSuccess:true, user: action.user, accessToken: action.accessToken
            }
        }
        case LOGIN_FAILED: {
            return{
                ...state, loginFailed:true
            }
        }
        case REGISTER_REQUEST: {
            return{
                ...state, registerRequest:true
            }
        }
        case REGISTER_SUCCESS: {
            return{
                ...state, registerRequest:false, registerSuccess:true, user: action.user, accessToken: action.accessToken
            }
        }
        case REGISTER_FAILED: {
            return{
                ...state, registerFailed:true
            }
        }
        case LOGOUT_REQUEST: {
            return{
                ...state, logoutRequest:true
            }
        }
        case LOGOUT_SUCCESS: {
            return{
                ...state, logoutRequest:false, logoutSuccess:true
            }
        }
        case LOGOUT_FAILED: {
            return{
                ...state, logoutFailed:true
            }
        }
        case TOKEN_REQUEST: {
            return{
                ...state, tokenRequest:true
            }
        }
        case TOKEN_SUCCESS: {
            return{
                ...state, tokenRequest:false, tokenSuccess:true, accessToken: action.accessToken
            }
        }
        case TOKEN_FAILED: {
            return{
                ...state, tokenFailed:true
            }
        }
        default: {
            return state;
        }
    }
}