import { IFeedItem } from '../../models/models';
import {
    WS_PROFILE_CONNECTION_CLOSED,
    WS_PROFILE_CONNECTION_ERROR,
    WS_PROFILE_CONNECTION_SUCCESS,
    WS_PROFILE_GET_MESSAGE,
    GET_PROFILE_ORDER_BY_ID,
    HIDE_MODAL_PROFILE,
    SHOW_ORDER_PROFILE_DETAILS
} from '../constants';
import { TWsProfileFeedActions } from '../actions/wsProfileFeed';
import { mapFeedDbItemsToFeedItems } from '../../utils/utils';

export type TProfileFeedState = {
    orders: ReadonlyArray<IFeedItem>,
    wsProfileConnected: boolean,
    viewedOrder: IFeedItem | null,
    profileItemModalVisible: boolean
}

const initialState: TProfileFeedState = {
    orders: [],
    wsProfileConnected: false,
    viewedOrder: null,
    profileItemModalVisible: false
}

export const profileFeedReducer = (state = initialState, action: TWsProfileFeedActions): TProfileFeedState => {
    switch (action.type) {
        case WS_PROFILE_CONNECTION_SUCCESS:
            return {
                ...state, wsProfileConnected: true
            };

        case WS_PROFILE_CONNECTION_ERROR:
            return {
                ...state, wsProfileConnected: false
            }

        case WS_PROFILE_CONNECTION_CLOSED:
            return {
                ...state, wsProfileConnected: false
            }
        case WS_PROFILE_GET_MESSAGE:
            return {
                ...state,
                orders: mapFeedDbItemsToFeedItems(action.feed.orders, action.ingredients)
            }

        case HIDE_MODAL_PROFILE:
            return {
                ...state, viewedOrder: null, profileItemModalVisible: false
            }

        case GET_PROFILE_ORDER_BY_ID:
            return {
                ...state, viewedOrder: state.orders.filter(order => order._id === action.id)[0], profileItemModalVisible: true
            }

        case SHOW_ORDER_PROFILE_DETAILS:
            return {
                ...state, profileItemModalVisible: true, viewedOrder: action.feedITem
            }

        default: {
            return state;
        }
    }
}

