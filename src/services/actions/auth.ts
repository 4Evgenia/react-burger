import { loginRequest, logoutRequest, registerRequest, tokenRequest } from '../../utils/api';
import { setCookie, deleteCookie } from '../../utils/utils';
import { AUTH_PREFIX, ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from '../../models/constants';

export const FORGOT_PASSWORD_SET_EMAIL = 'FORGOT_PASSWORD_SET_EMAIL';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const TOKEN_REQUEST = 'TOKEN_REQUEST';
export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
export const TOKEN_FAILED = 'TOKEN_FAILED';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

// LOGIN
export function login(email:string, password:string){
    return function(dispatch:any){
        dispatch({
            type: LOGIN_REQUEST
        });
        loginRequest(email, password).then((res:any) => {
            if (res && res.success){
                console.log(res);
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
export function register(email:string, password:string, name: string){
    return function(dispatch:any){
        dispatch({
            type: REGISTER_REQUEST
        });
        registerRequest(email, password, name).then(res => {
            if (res && res.success){
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
export function logout(){
    return function(dispatch:any){
        dispatch({
            type: LOGOUT_REQUEST
        });
        logoutRequest().then(res => {
            if (res && res.success){
                console.log(res);
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
    };
}

// TOKEN
export function token(){
    return function(dispatch:any){
        dispatch({
            type: TOKEN_REQUEST
        });
        tokenRequest().then(res => {
            if (res && res.success){
                console.log(res);
                dispatch({
                    type: TOKEN_SUCCESS
                });
            } else {
                dispatch({
                    type: TOKEN_FAILED
                })
            }
        }).catch(e => {
            dispatch({
                type: TOKEN_FAILED
            })
       })
    };
}

const storeTokens = (response: any) => {
    if (response.accessToken && response.accessToken.indexOf(AUTH_PREFIX) === 0){
        setCookie(ACCESS_TOKEN_COOKIE, response.accessToken.split(`${AUTH_PREFIX} `)[1], { expires: 20*60 });
    }
    if (response.refreshToken){
        setCookie(REFRESH_TOKEN_COOKIE, response.refreshToken);
    }
}

