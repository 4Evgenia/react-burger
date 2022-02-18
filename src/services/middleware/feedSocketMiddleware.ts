import { TWsFeedActions } from '../actions/wsFeed';
import { TWsProfileFeedActions } from '../actions/wsProfileFeed';
import type { Middleware, MiddlewareAPI } from 'redux';
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE
} from '../constants/wsFeed';
import { AppDispatch, RootState } from '../types';
import { getCookie } from '../../utils/utils';
import { ACCESS_TOKEN_COOKIE } from '../../models/constants';
import {
    WS_PROFILE_CONNECTION_CLOSED,
    WS_PROFILE_CONNECTION_ERROR,
    WS_PROFILE_CONNECTION_START,
    WS_PROFILE_CONNECTION_SUCCESS,
    WS_PROFILE_GET_MESSAGE
} from '../constants';

export type wsActions = {
    wsInit: typeof WS_CONNECTION_START | typeof WS_PROFILE_CONNECTION_START,
    onOpen: typeof WS_CONNECTION_SUCCESS | typeof WS_PROFILE_CONNECTION_SUCCESS,
    onClose: typeof WS_CONNECTION_CLOSED | typeof WS_PROFILE_CONNECTION_CLOSED,
    onError: typeof WS_CONNECTION_ERROR | typeof WS_PROFILE_CONNECTION_ERROR,
    onMessage: typeof WS_GET_MESSAGE | typeof WS_PROFILE_GET_MESSAGE
}

export const socketMiddleware = (wsUrl: string, wsActions: wsActions, includeToken: boolean = false): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: TWsFeedActions | TWsProfileFeedActions) => {
            const { dispatch, getState } = store;
            const { type } = action;
            const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

            if (type === wsInit) {
                // объект класса WebSocket
                const token = includeToken ? `?token=${getCookie(ACCESS_TOKEN_COOKIE)}` : '';
                socket = new WebSocket(`${wsUrl}${token}`);
            }

            if (socket) {
                // функция, которая вызывается при открытии сокета
                socket.onopen = () => {
                    dispatch({ type: onOpen });
                };

                // функция, которая вызывается при ошибке соединения
                socket.onerror = () => {
                    dispatch({ type: onError });
                };

                // функция, которая вызывается при получения события от сервера
                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    const { success, ...restParsedData } = parsedData;
                    dispatch({ type: onMessage, feed: restParsedData, ingredients: getState().burger.ingredients});
                };

                // функция, которая вызывается при закрытии соединения
                socket.onclose = () => {
                    dispatch({ type: onClose });
                };
            }

            next(action);
        };
    }) as Middleware;
}