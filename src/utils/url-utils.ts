import authHeader from "./auth-header";

export const BASE_API_URL = "https://norma.nomoreparties.space/api/";
export const SERVER_ERROR_MESSAGE = "Server Error";

export const UNAUTHORIZED = 401;
export const OK = 200;

export const buildUrl = (endPoint:string) => `${BASE_API_URL}${endPoint}`;

export const authConfig = { headers: authHeader() };

export const checkResponse = (res:any) => {
    if (res.status === OK)
        return res.data;
    throw new Error(SERVER_ERROR_MESSAGE)
}