import {
    WS_PROFILE_CONNECTION_CLOSED,
    WS_PROFILE_CONNECTION_ERROR,
    WS_PROFILE_CONNECTION_START,
    WS_PROFILE_CONNECTION_SUCCESS,
    WS_PROFILE_GET_MESSAGE,
    GET_PROFILE_ORDER_BY_ID,
    HIDE_MODAL_PROFILE,
    SHOW_ORDER_PROFILE_DETAILS
} from '../constants';
import { IFeed, IFeedItem, IIngredient } from '../../models/models';

export interface IWsProfileFeedConnectionSuccessAction {
    readonly type: typeof WS_PROFILE_CONNECTION_SUCCESS
}

export interface IWsProfileFeedConnectionErrorAction {
    readonly type: typeof WS_PROFILE_CONNECTION_ERROR
}

export interface IWsProfileFeedConnectionClosedAction {
    readonly type: typeof WS_PROFILE_CONNECTION_CLOSED
}

export interface IWsProfileFeedConnectionStartAction {
    readonly type: typeof WS_PROFILE_CONNECTION_START
}

export interface IWsProfileFeedGetMessageAction {
    readonly type: typeof WS_PROFILE_GET_MESSAGE,
    readonly feed: IFeed,
    readonly ingredients: ReadonlyArray<IIngredient>
}

export interface IGetProfileOrderByIdAction {
    readonly type: typeof GET_PROFILE_ORDER_BY_ID,
    readonly id: string;
}

export interface IHideProfileFeedItemDetailsAction {
    readonly type: typeof HIDE_MODAL_PROFILE;
}

export interface IShowProfileOrderDetailsAction {
    readonly type: typeof SHOW_ORDER_PROFILE_DETAILS;
    readonly feedITem: IFeedItem
}

// Генераторы экшенов
export const wsProfileFeedConnectionSuccess = ():IWsProfileFeedConnectionSuccessAction => ({
    type: WS_PROFILE_CONNECTION_SUCCESS
});

export const wsProfileFeedConnectionError = ():IWsProfileFeedConnectionErrorAction => ({
    type: WS_PROFILE_CONNECTION_ERROR
});

export const wsProfileFeedConnectionClosed = ():IWsProfileFeedConnectionClosedAction => ({
    type: WS_PROFILE_CONNECTION_CLOSED
});

export const wsProfileFeedConnectionStart = ():IWsProfileFeedConnectionStartAction => ({
    type: WS_PROFILE_CONNECTION_START
});

export const wsProfileFeedGetMessage = (feed: IFeed, ingredients: ReadonlyArray<IIngredient>):IWsProfileFeedGetMessageAction => ({
    type: WS_PROFILE_GET_MESSAGE,
    feed,
    ingredients
});

export const getProfileOrderById = (id: string):IGetProfileOrderByIdAction => ({
    type: GET_PROFILE_ORDER_BY_ID,
    id
});

export const hideProfileFeedItemDetailsModal = ():IHideProfileFeedItemDetailsAction => ({
    type: HIDE_MODAL_PROFILE
})

export const showProfileOrderDetails = (feedITem:IFeedItem):IShowProfileOrderDetailsAction => ({
    type: SHOW_ORDER_PROFILE_DETAILS,
    feedITem
})

export type TWsProfileFeedActions = IWsProfileFeedConnectionSuccessAction
    | IWsProfileFeedConnectionErrorAction
    | IWsProfileFeedConnectionClosedAction
    | IWsProfileFeedConnectionStartAction
    | IWsProfileFeedGetMessageAction
    | IGetProfileOrderByIdAction
    | IHideProfileFeedItemDetailsAction
    | IShowProfileOrderDetailsAction;
