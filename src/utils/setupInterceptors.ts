import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ACCESS_TOKEN_COOKIE, AUTH_PREFIX, REFRESH_TOKEN_COOKIE } from "../models/constants";
import { tokenRefreshSuccess } from "../services/actions/auth";
import { TAppStore } from "../services/types";
import { BASE_API_URL, buildUrl, UNAUTHORIZED } from "./url-utils";
import { getCookie, storeTokens } from "./utils";


export const authInstance = axios.create({ baseURL: BASE_API_URL, headers: { "Content-Type": "application/json" } })

const setup = (store: TAppStore ) => {
    authInstance.interceptors.request.use(
        (config: AxiosRequestConfig) => {
            const accessToken = getCookie(ACCESS_TOKEN_COOKIE);
            if (accessToken && config.headers) {
                config.headers['Authorization'] = `${AUTH_PREFIX} ${accessToken}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    const { dispatch } = store;

    authInstance.interceptors.response.use(
        (res: AxiosResponse) => { return res; },
        async (err) => {
            const originalConfig = err.config;
            if (err.response.status === UNAUTHORIZED && !originalConfig._retry) {
                originalConfig._retry = true;
                try {
                    const rs = await axios.post(buildUrl("auth/token"), { token: getCookie(REFRESH_TOKEN_COOKIE) });
                    dispatch(tokenRefreshSuccess());
                    storeTokens(rs.data);
                    return authInstance(originalConfig);
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }
            return Promise.reject(err);
        }
    );
};

export default setup;