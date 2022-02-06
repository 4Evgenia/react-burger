import { getCookie } from "./utils";
import { ACCESS_TOKEN_COOKIE, AUTH_PREFIX } from '../models/constants';
import { AxiosRequestHeaders } from "axios";

export default function authHeader(): AxiosRequestHeaders {
    const accessToken = getCookie(ACCESS_TOKEN_COOKIE);
    if (accessToken) {
        return { Authorization: `${AUTH_PREFIX} ${accessToken}` }
    } else {
        return {};
    }
}