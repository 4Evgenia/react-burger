import { IFeedItem, IFeedSummary } from '../../models/models';
import {
    GET_ORDER_BY_ID,
    HIDE_MODAL_FEED,
    SHOW_ORDER_FEED_DETAILS,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE
} from '../constants';
import { TWsFeedActions } from '../actions/wsFeed';
import { DONE_STATUS } from '../../models/constants';
import { mapFeedDbItemsToFeedItems, onlyUnique } from '../../utils/utils';

type TFeedState = {
    orders: ReadonlyArray<IFeedItem>,
    wsConnected: boolean,
    summary: IFeedSummary,
    viewedOrder: IFeedItem | null,
    feedItemModalVisible: boolean
}

const initialState: TFeedState = {
    orders: [],
    wsConnected: false,
    summary: { done: [], inProgress: [], total: 0, totalToday: 0 },
    viewedOrder: null,
    feedItemModalVisible: false
}

export const feedReducer = (state = initialState, action: TWsFeedActions): TFeedState => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS:
            return {
                ...state, wsConnected: true
            };

        case WS_CONNECTION_ERROR:
            return {
                ...state, wsConnected: false
            }

        case WS_CONNECTION_CLOSED:
            return {
                ...state, wsConnected: false
            }
        case WS_GET_MESSAGE:
            const done = action.feed.orders.filter(o => o.status === DONE_STATUS).map(o => o.number);
            const pending = action.feed.orders.filter(o => o.status !== DONE_STATUS).map(o => o.number);

            return {
                ...state,
                summary: {
                    ...state.summary,
                    done: done,
                    inProgress: pending,
                    total: action.feed.total,
                    totalToday: action.feed.totalToday
                },
                orders: mapFeedDbItemsToFeedItems(action.feed.orders, action.ingredients)
            }

        case HIDE_MODAL_FEED: 
           return {
                ...state, viewedOrder: null, feedItemModalVisible: false
            }

        case GET_ORDER_BY_ID:
            return {
                ...state, viewedOrder: state.orders.filter(order => order._id === action.id)[0], feedItemModalVisible: true
            }

        case SHOW_ORDER_FEED_DETAILS:
            return {
                ...state, feedItemModalVisible: true, viewedOrder: action.feedITem
            }

        default: {
            return state;
        }
    }
}

