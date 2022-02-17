import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE,
    GET_ORDER_BY_ID,
    HIDE_MODAL_FEED,
    SHOW_ORDER_FEED_DETAILS
} from '../constants';
import { IFeed, IFeedItem, IIngredient } from '../../models/models';

export interface IWsFeedConnectionSuccessAction {
    readonly type: typeof WS_CONNECTION_SUCCESS
}

export interface IWsFeedConnectionErrorAction {
    readonly type: typeof WS_CONNECTION_ERROR
}

export interface IWsFeedConnectionClosedAction {
    readonly type: typeof WS_CONNECTION_CLOSED
}

export interface IWsFeedConnectionStartAction {
    readonly type: typeof WS_CONNECTION_START
}

export interface IWsFeedGetMessageAction {
    readonly type: typeof WS_GET_MESSAGE,
    readonly feed: IFeed,
    readonly ingredients: ReadonlyArray<IIngredient>
}

export interface IGetOrderByIdAction {
    readonly type: typeof GET_ORDER_BY_ID,
    readonly id: string;
}

export interface IHideFeedItemDetailsAction {
    readonly type: typeof HIDE_MODAL_FEED;
}

export interface IShowOrderDetailsAction {
    readonly type: typeof SHOW_ORDER_FEED_DETAILS;
    readonly feedITem: IFeedItem
}

// Генераторы экшенов
export const wsFeedConnectionSuccess = ():IWsFeedConnectionSuccessAction => ({
    type: WS_CONNECTION_SUCCESS
});

export const wsFeedConnectionError = ():IWsFeedConnectionErrorAction => ({
    type: WS_CONNECTION_ERROR
});

export const wsFeedConnectionClosed = ():IWsFeedConnectionClosedAction => ({
    type: WS_CONNECTION_CLOSED
});

export const wsFeedConnectionStart = ():IWsFeedConnectionStartAction => ({
    type: WS_CONNECTION_START
});

export const wsFeedGetMessage = (feed: IFeed, ingredients: ReadonlyArray<IIngredient>):IWsFeedGetMessageAction => ({
    type: WS_GET_MESSAGE,
    feed,
    ingredients
});

export const getOrderById = (id: string):IGetOrderByIdAction => ({
    type: GET_ORDER_BY_ID,
    id
});

export const hideFeedItemDetailsModal = ():IHideFeedItemDetailsAction => ({
    type: HIDE_MODAL_FEED
})

export const showOrderDetails = (feedITem:IFeedItem):IShowOrderDetailsAction => ({
    type: SHOW_ORDER_FEED_DETAILS,
    feedITem
})

export type TWsFeedActions = IWsFeedConnectionSuccessAction
    | IWsFeedConnectionErrorAction
    | IWsFeedConnectionClosedAction
    | IWsFeedConnectionStartAction
    | IWsFeedGetMessageAction
    | IGetOrderByIdAction
    | IHideFeedItemDetailsAction
    | IShowOrderDetailsAction;
