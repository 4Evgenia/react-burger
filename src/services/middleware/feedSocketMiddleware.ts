import {
    TWsFeedActions,
    wsFeedConnectionClosed,
    wsFeedConnectionError,
    wsFeedConnectionStart,
    wsFeedGetMessage
} from '../actions/wsFeed';
import type { Middleware, MiddlewareAPI } from 'redux';
import {
    WS_CONNECTION_START
} from '../constants/wsFeed';
import { AppDispatch, RootState } from '../types';
import { getCookie } from '../../utils/utils';
import { ACCESS_TOKEN_COOKIE } from '../../models/constants';

export const socketMiddleware = (wsUrl: string, includeToken: boolean = false): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: TWsFeedActions) => {
            const { dispatch, getState  } = store;
            const { type } = action;

            if (type === WS_CONNECTION_START) {
                // объект класса WebSocket
                const token = includeToken ? `?token=${getCookie(ACCESS_TOKEN_COOKIE)}` : '';
                socket = new WebSocket(`${wsUrl}${token}`);
            }

            if (socket) {
                // функция, которая вызывается при открытии сокета
                socket.onopen = () => {
                    dispatch(wsFeedConnectionStart());
                };

                // функция, которая вызывается при ошибке соединения
                socket.onerror = () => {
                    dispatch(wsFeedConnectionError());
                };

                // функция, которая вызывается при получения события от сервера
                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    const { success, ...restParsedData } = parsedData;
                    dispatch(wsFeedGetMessage(restParsedData, getState().burger.ingredients));
                };

                // функция, которая вызывается при закрытии соединения
                socket.onclose = () => {
                    dispatch(wsFeedConnectionClosed());
                };
            }

            next(action);
        };
    }) as Middleware;
}