import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE
} from '../constants';
import { IFeed, IIngredient } from '../../models/models';

export interface IWsFeedConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS
}

export interface IWsFeedConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR
}

export interface IWsFeedConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED
}

export interface IWsFeedConnectionStart {
    readonly type: typeof WS_CONNECTION_START
}

export interface IWsFeedGetMessage {
    readonly type: typeof WS_GET_MESSAGE,
    readonly feed: IFeed,
    readonly ingredients: ReadonlyArray<IIngredient>
}

// Генераторы экшенов
export const wsFeedConnectionSuccess = ():IWsFeedConnectionSuccess => ({
    type: WS_CONNECTION_SUCCESS
});

export const wsFeedConnectionError = ():IWsFeedConnectionError => ({
    type: WS_CONNECTION_ERROR
});

export const wsFeedConnectionClosed = ():IWsFeedConnectionClosed => ({
    type: WS_CONNECTION_CLOSED
});

export const wsFeedConnectionStart = ():IWsFeedConnectionStart => ({
    type: WS_CONNECTION_START
});

export const wsFeedGetMessage = (feed: IFeed, ingredients: ReadonlyArray<IIngredient>):IWsFeedGetMessage => ({
    type: WS_GET_MESSAGE,
    feed,
    ingredients
});

export type TWsFeedActions = IWsFeedConnectionSuccess
    | IWsFeedConnectionError
    | IWsFeedConnectionClosed
    | IWsFeedConnectionStart
    | IWsFeedGetMessage;
