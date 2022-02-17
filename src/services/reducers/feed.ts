import { IFeedItem, IFeedItemDb, IFeedSummary } from '../../models/models';
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE
} from '../constants';
import { TWsFeedActions } from '../actions/wsFeed';
import { DONE_STATUS } from '../../models/constants';
import { onlyUnique } from '../../utils/utils';

type TFeedState = {
    orders: ReadonlyArray<IFeedItem>,
    wsConnected: boolean,
    summary: IFeedSummary
}

const initialState: TFeedState = {
    orders: [],
    wsConnected: false,
    summary: { done: [], inProgress: [], total: 0, totalToday: 0 }
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
            const feedOrders = action.feed.orders.map(o => {
                let countedIngs: CountedIngredients = {};
                o.ingredients.forEach(ing => {
                    countedIngs = { ...countedIngs, [ing]: isNaN(countedIngs[ing]) ? 1 : countedIngs[ing] + 1 }
                });
                
                const uniqueIng = o.ingredients.filter(onlyUnique);

                let order: IFeedItem = {
                    date: o.createdAt,
                    title: o.name,
                    _id: o._id,
                    number: o.number,
                    status: o.status,
                    ingredients: uniqueIng.map(id => {
                        const ingredient = action.ingredients.filter(ing => ing._id === id)[0];
                        return { ...ingredient, qty: countedIngs[id] };
                    })
                }
                return order;
            })

            return {
                ...state,
                summary: {
                    ...state.summary,
                    done: done,
                    inProgress: pending,
                    total: action.feed.total,
                    totalToday: action.feed.totalToday
                },
                orders: feedOrders
            }
        default: {
            return state;
        }
    }
}

type CountedIngredients = {
    [key: string]: number;
}

