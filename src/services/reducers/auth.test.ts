import { authReducer, TAuthState } from './auth';
import { IUser } from '../../models/models';
import {
    FORGOT_PASSWORD_REQUEST_FAILED,
    FORGOT_PASSWORD_REQUEST_SUCCESS,
    FORGOT_PASSWORD_SET_EMAIL,
    FORGOT_PASSWORD_SUBMIT_FAILED,
    FORGOT_PASSWORD_SUBMIT_SUCCESS,
    GET_USER_FAILED,
    GET_USER_SUCCESS,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    LOGOUT_FAILED,
    LOGOUT_SUCCESS,
    REGISTER_FAILED,
    REGISTER_SUCCESS,
    SET_USER_FAILED,
    SET_USER_REQUEST,
    SET_USER_SUCCESS,
    TOKEN_REFRESH_FAILED,
    TOKEN_REFRESH_SUCCESS
} from '../constants';

const user: IUser = {
    name: 'Bred Pitt',
    email: 'test@test.com',
    password: 'test'
}

const initialState: TAuthState = {
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

describe('Auth reducer', () => {
    it('should handle FORGOT_PASSWORD_SET_EMAIL', () => {
        expect(authReducer(initialState, {
            type: FORGOT_PASSWORD_SET_EMAIL,
            email: 'test@test.com'
        })).toEqual({
            email: 'test@test.com',
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
        })
    })

    it('should handle FORGOT_PASSWORD_REQUEST_SUCCESS', () => {
        expect(authReducer(initialState, {
            type: FORGOT_PASSWORD_REQUEST_SUCCESS
        })).toEqual({
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
            forgotPasswordRequestSuccess: true,
            forgotPasswordRequestFailed: false,
            forgotPasswordSubmitSuccess: false,
            forgotPasswordSubmitFailed: false,
            setUserSuccess: false,
            setUserFailed: false
        })
    })

    it('should handle FORGOT_PASSWORD_REQUEST_FAILED', () => {
        expect(authReducer(initialState, {
            type: FORGOT_PASSWORD_REQUEST_FAILED
        })).toEqual({
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
            forgotPasswordRequestFailed: true,
            forgotPasswordSubmitSuccess: false,
            forgotPasswordSubmitFailed: false,
            setUserSuccess: false,
            setUserFailed: false
        })
    })

    it('should handle FORGOT_PASSWORD_SUBMIT_SUCCESS', () => {
        expect(authReducer(initialState, {
            type: FORGOT_PASSWORD_SUBMIT_SUCCESS
        })).toEqual({
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
            forgotPasswordSubmitSuccess: true,
            forgotPasswordSubmitFailed: false,
            setUserSuccess: false,
            setUserFailed: false
        })
    })

    it('should handle FORGOT_PASSWORD_SUBMIT_FAILED', () => {
        expect(authReducer(initialState, {
            type: FORGOT_PASSWORD_SUBMIT_FAILED
        })).toEqual({
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
            forgotPasswordSubmitFailed: true,
            setUserSuccess: false,
            setUserFailed: false
        })
    })

    it('should handle LOGIN_SUCCESS', () => {
        expect(authReducer(initialState, {
            type: LOGIN_SUCCESS,
            user
        })).toEqual({
            email: '',
            user: user,
            loginSuccess: true,
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
        })
    })

    it('should handle LOGIN_FAILED', () => {
        expect(authReducer(initialState, {
            type: LOGIN_FAILED
        })).toEqual({
            email: '',
            user: null,
            loginSuccess: false,
            loginFailed: true,
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
        })
    })

    it('should handle REGISTER_SUCCESS', () => {
        expect(authReducer(initialState, {
            type: REGISTER_SUCCESS,
            user
        })).toEqual({
            email: '',
            user: user,
            loginSuccess: false,
            loginFailed: false,
            registerSuccess: true,
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
        })
    })

    it('should handle REGISTER_FAILED', () => {
        expect(authReducer(initialState, {
            type: REGISTER_FAILED
        })).toEqual({
            email: '',
            user: null,
            loginSuccess: false,
            loginFailed: false,
            registerSuccess: false,
            registerFailed: true,
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
        })
    })

    it('should handle LOGOUT_SUCCESS', () => {
        expect(authReducer({
            email: '',
            user: user,
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
        }, {
            type: LOGOUT_SUCCESS
        })).toEqual({
            email: '',
            user: null,
            loginSuccess: false,
            loginFailed: false,
            registerSuccess: false,
            registerFailed: false,
            logoutSuccess: true,
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
        })
    })

    it('should handle LOGOUT_FAILED', () => {
        expect(authReducer(initialState, {
            type: LOGOUT_FAILED
        })).toEqual({
            email: '',
            user: null,
            loginSuccess: false,
            loginFailed: false,
            registerSuccess: false,
            registerFailed: false,
            logoutSuccess: false,
            logoutFailed: true,
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
        })
    })

    it('should handle TOKEN_REFRESH_SUCCESS', () => {
        expect(authReducer(initialState, {
            type: TOKEN_REFRESH_SUCCESS
        })).toEqual({
            email: '',
            user: null,
            loginSuccess: false,
            loginFailed: false,
            registerSuccess: false,
            registerFailed: false,
            logoutSuccess: false,
            logoutFailed: false,
            tokenSuccess: true,
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
        })
    })

    it('should handle TOKEN_REFRESH_FAILED', () => {
        expect(authReducer(initialState, {
            type: TOKEN_REFRESH_FAILED
        })).toEqual({
            email: '',
            user: null,
            loginSuccess: false,
            loginFailed: false,
            registerSuccess: false,
            registerFailed: false,
            logoutSuccess: false,
            logoutFailed: false,
            tokenSuccess: false,
            tokenFailed: true,
            accessToken: null,
            getUserSuccess: false,
            getUserFailed: false,
            forgotPasswordRequestSuccess: false,
            forgotPasswordRequestFailed: false,
            forgotPasswordSubmitSuccess: false,
            forgotPasswordSubmitFailed: false,
            setUserSuccess: false,
            setUserFailed: false
        })
    })

    it('should handle GET_USER_SUCCESS', () => {
        expect(authReducer(initialState, {
            type: GET_USER_SUCCESS,
            user: user
        })).toEqual({
            email: '',
            user: user,
            loginSuccess: false,
            loginFailed: false,
            registerSuccess: false,
            registerFailed: false,
            logoutSuccess: false,
            logoutFailed: false,
            tokenSuccess: false,
            tokenFailed: false,
            accessToken: null,
            getUserSuccess: true,
            getUserFailed: false,
            forgotPasswordRequestSuccess: false,
            forgotPasswordRequestFailed: false,
            forgotPasswordSubmitSuccess: false,
            forgotPasswordSubmitFailed: false,
            setUserSuccess: false,
            setUserFailed: false
        })
    })

    it('should handle GET_USER_FAILED', () => {
        expect(authReducer(initialState, {
            type: GET_USER_FAILED
        })).toEqual({
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
            getUserFailed: true,
            forgotPasswordRequestSuccess: false,
            forgotPasswordRequestFailed: false,
            forgotPasswordSubmitSuccess: false,
            forgotPasswordSubmitFailed: false,
            setUserSuccess: false,
            setUserFailed: false
        })
    })

    it('should handle SET_USER_SUCCESS', () => {
        expect(authReducer({
            email: '',
            user: user,
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
        }, {
            type: SET_USER_SUCCESS,
            user: { ...user, email: 'test1@test.com' }
        })).toEqual({
            email: '',
            user: { ...user, email: 'test1@test.com' },
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
            setUserSuccess: true,
            setUserFailed: false
        })
    })

    it('should handle SET_USER_FAILED', () => {
        expect(authReducer(initialState, {
            type: SET_USER_FAILED
        })).toEqual({
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
            setUserFailed: true
        })
    })

    it('should handle SET_USER_REQUEST', () => {
        expect(authReducer({
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
            setUserFailed: true
        }, {
            type: SET_USER_REQUEST
        })).toEqual({
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
        })
    })
})
