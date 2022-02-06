import { ROUTES } from "../models/constants";
import authHeader from "./auth-header";
import { matchPath } from 'react-router-dom'
import { AxiosResponse } from "axios";

export const BASE_API_URL = "https://norma.nomoreparties.space/api/";
export const SERVER_ERROR_MESSAGE = "Server Error";

export const UNAUTHORIZED = 401;
export const OK = 200;

export const buildUrl = (endPoint:string) => `${BASE_API_URL}${endPoint}`;

export const authConfig = { headers: authHeader() };

export const checkResponse = (res:AxiosResponse) => {
    if (res.status === OK)
        return res.data;
    throw new Error(SERVER_ERROR_MESSAGE)
}

export const ifPathMatch = (path:string) => {
    for(const route in ROUTES){
        const match = matchPath(path, {
            path: ROUTES[route].path,
            exact: true,
            strict:false
        })
        if (match)
            return true;
    }
    return false;
}