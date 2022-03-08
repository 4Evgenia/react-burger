import { TFeedState, feedReducer } from './feed';
import { bun1, bun3, meat2, order1 } from '../../utils/test.utils';
import {
    GET_ORDER_BY_ID,
    HIDE_MODAL_FEED,
    SHOW_ORDER_FEED_DETAILS,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE
} from '../constants';

const initialState: TFeedState = {
    orders: [],
    wsConnected: false,
    summary: { done: [], inProgress: [], total: 0, totalToday: 0 },
    viewedOrder: null,
    feedItemModalVisible: false
}


describe('Feed reducer', () => {
    it('should handle WS_CONNECTION_SUCCESS', () => {
        expect(feedReducer(initialState, {
            type: WS_CONNECTION_SUCCESS
        })).toEqual({
            ...initialState,
            wsConnected: true
        })
    })

    it('should handle WS_CONNECTION_ERROR', () => {
        expect(feedReducer(initialState, {
            type: WS_CONNECTION_ERROR
        })).toEqual({
            ...initialState,
            wsConnected: false
        })
    })

    it('should handle WS_CONNECTION_CLOSED', () => {
        expect(feedReducer(initialState, {
            type: WS_CONNECTION_CLOSED
        })).toEqual({
            ...initialState,
            wsConnected: false
        })
    })

    it('should handle HIDE_MODAL_FEED', () => {
        expect(feedReducer({
            orders: [order1],
            wsConnected: true,
            summary: { done: [11174, 11173, 11172], inProgress: [11172], total: 11087, totalToday: 3 },
            viewedOrder: order1,
            feedItemModalVisible: true
        }, {
            type: HIDE_MODAL_FEED
        })).toEqual({
            ...initialState,
            orders: [order1],
            wsConnected: true,
            summary: { done: [11174, 11173, 11172], inProgress: [11172], total: 11087, totalToday: 3 },
            viewedOrder: null,
            feedItemModalVisible: false
        })
    })

    it('should handle GET_ORDER_BY_ID', () => {
        expect(feedReducer({
            orders: [order1],
            wsConnected: true,
            summary: { done: [11174, 11173, 11172], inProgress: [11172], total: 11087, totalToday: 3 },
            viewedOrder: order1,
            feedItemModalVisible: false
        }, {
            type: GET_ORDER_BY_ID,
            id: '6224ccfc25b9a4001b6e2f5e'
        })).toEqual({
            ...initialState,
            orders: [order1],
            wsConnected: true,
            summary: { done: [11174, 11173, 11172], inProgress: [11172], total: 11087, totalToday: 3 },
            viewedOrder: order1,
            feedItemModalVisible: true
        })
    })

    it('should handle SHOW_ORDER_FEED_DETAILS', () => {
        expect(feedReducer({
            orders: [order1],
            wsConnected: true,
            summary: { done: [11174, 11173, 11172], inProgress: [11172], total: 11087, totalToday: 3 },
            viewedOrder: order1,
            feedItemModalVisible: false
        }, {
            type: SHOW_ORDER_FEED_DETAILS,
            feedITem: order1
        })).toEqual({
            ...initialState,
            orders: [order1],
            wsConnected: true,
            summary: { done: [11174, 11173, 11172], inProgress: [11172], total: 11087, totalToday: 3 },
            viewedOrder: order1,
            feedItemModalVisible: true
        })
    })

    it('should handle WS_GET_MESSAGE', () => {
        expect(feedReducer(initialState, {
            type: WS_GET_MESSAGE,
            feed: {
                orders: [{
                    _id: '6224ccfc25b9a4001b6e2f5e',
                    createdAt: '2022-03-06T15:02:20.481Z',
                    updatedAt: '2022-03-06T15:12:20.481Z',
                    name: 'Бессмертный флюоресцентный space бургер',
                    number: 11175,
                    status: 'done',
                    ingredients: ['60d3b41abdacab0026a733c6', '60d3b41abdacab0026a733c6', '60d3b41abdacab0026a733c8']
                }, {
                    _id: '6224b85e25b9a4001b6e2f23',
                    createdAt: '2022-03-06T13:34:22.603Z',
                    updatedAt: '2022-03-06T13:54:22.603Z',
                    name: 'Био-марсианский краторный space бургер',
                    number: 11174,
                    status: 'created',
                    ingredients: ['60d3b41abdacab0026a733c6', '60d3b41abdacab0026a733c8']
                }],
                total: 11087,
                totalToday: 2
            },
            ingredients: [
                bun1, meat2, bun3
            ]
        })).toEqual({
            orders: [{
                date: '2022-03-06T15:02:20.481Z',
                title: 'Бессмертный флюоресцентный space бургер',
                _id: '6224ccfc25b9a4001b6e2f5e',
                number: 11175,
                status: 'done',
                ingredients: [{ ...bun1, qty: 2 }, { ...meat2, qty: 1 }]
            }, {
                date: '2022-03-06T13:34:22.603Z',
                title: 'Био-марсианский краторный space бургер',
                _id: '6224b85e25b9a4001b6e2f23',
                number: 11174,
                status: 'created',
                ingredients: [{ ...bun1, qty: 1 }, { ...meat2, qty: 1 }]
            }],
            wsConnected: false,
            summary: { done: [11175], inProgress: [11174], total: 11087, totalToday: 2 },
            viewedOrder: null,
            feedItemModalVisible: false
        })
    })
});