import axios from 'axios';
import { authConfig, buildUrl, checkResponse } from "./url-utils";
import { authInstance } from './setupInterceptors';
import { IIngredient, IUser } from '../models/models';

// FETCH INGREDIENTS
export const fetchIngredients = () => axios.get(buildUrl("ingredients"))
        .then(checkResponse);

// SUBMIT ORDER
export const postOrder = (data: ReadonlyArray<IIngredient>) => authInstance.post(buildUrl("orders"), { ingredients: data })
        .then(checkResponse);

// FORGOT PASSWORD
export const passwordReset = (email: string) => axios.post(buildUrl("password-reset"), { email })
        .then(checkResponse);

// RESET PASSWORD SUBMIT
export const passwordResetSubmit = (password: string, token: string) => axios.post(buildUrl("password-reset/reset"), { password, token })
        .then(checkResponse);

// LOGIN
export const loginRequest = (email: string, password: string) => axios.post(buildUrl("auth/login"), { email, password })
        .then(checkResponse);

// REGISTER
export const registerRequest = (email: string, password: string, name: string) => axios.post(buildUrl("auth/register"), { name, email, password })
        .then(checkResponse);

// LOGOUT
export const logoutRequest = (token: string) => axios.post(buildUrl("auth/logout"), { token: token }).then(checkResponse);

// REFRESH TOKEN
export const tokenRequest = () => axios.post(buildUrl("auth/token")).then(checkResponse);

// GET USER
export const getUserRequest = () => authInstance.get(buildUrl("auth/user"), authConfig).then(checkResponse);

// UPDATE USER
export const updateUserRequest = (user: IUser) => authInstance.patch(buildUrl("auth/user"),
        user.password !== '' ? { email: user.email, name: user.name, password: user.password } : { email: user.email, name: user.name },
        authConfig).then(checkResponse);