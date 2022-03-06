import { TProfileFeedState, profileFeedReducer } from './profileFeed';
import { bun1, bun3, meat2, order1 } from '../../utils/test.utils';

const initialState: TProfileFeedState = {
    orders: [],
    wsProfileConnected: false,
    viewedOrder: null,
    profileItemModalVisible: false
}


describe('Profile Feed reducer', () => {
    it('should handle WS_PROFILE_CONNECTION_SUCCESS', () => {
        expect(profileFeedReducer(initialState, {
            type: 'WS_PROFILE_CONNECTION_SUCCESS'
        })).toEqual({
            ...initialState,
            wsProfileConnected: true
        })
    })

    it('should handle WS_PROFILE_CONNECTION_ERROR', () => {
        expect(profileFeedReducer(initialState, {
            type: 'WS_PROFILE_CONNECTION_ERROR'
        })).toEqual({
            ...initialState,
            wsProfileConnected: false
        })
    })

    it('should handle WS_PROFILE_CONNECTION_CLOSED', () => {
        expect(profileFeedReducer(initialState, {
            type: 'WS_PROFILE_CONNECTION_CLOSED'
        })).toEqual({
            ...initialState,
            wsProfileConnected: false
        })
    })

    it('should handle HIDE_MODAL_PROFILE', () => {
        expect(profileFeedReducer({
            orders: [order1],
            wsProfileConnected: true,
            viewedOrder: order1,
            profileItemModalVisible: true
        }, {
            type: 'HIDE_MODAL_PROFILE'
        })).toEqual({
            ...initialState,
            orders: [order1],
            wsProfileConnected: true,
            viewedOrder: null,
            profileItemModalVisible: false
        })
    })

    it('should handle GET_PROFILE_ORDER_BY_ID', () => {
        expect(profileFeedReducer({
            orders: [order1],
            wsProfileConnected: true,
            viewedOrder: order1,
            profileItemModalVisible: false
        }, {
            type: 'GET_PROFILE_ORDER_BY_ID',
            id: '6224ccfc25b9a4001b6e2f5e'
        })).toEqual({
            ...initialState,
            orders: [order1],
            wsProfileConnected: true,
            viewedOrder: order1,
            profileItemModalVisible: true
        })
    })

    it('should handle SHOW_ORDER_PROFILE_DETAILS', () => {
        expect(profileFeedReducer({
            orders: [order1],
            wsProfileConnected: true,
            viewedOrder: order1,
            profileItemModalVisible: false
        }, {
            type: 'SHOW_ORDER_PROFILE_DETAILS',
            feedITem: order1
        })).toEqual({
            ...initialState,
            orders: [order1],
            wsProfileConnected: true,
            viewedOrder: order1,
            profileItemModalVisible: true
        })
    })

    it('should handle WS_PROFILE_GET_MESSAGE', () => {
        expect(profileFeedReducer(initialState, {
            type: 'WS_PROFILE_GET_MESSAGE',
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
                ingredients: [{...bun1, qty: 2}, {...meat2, qty: 1}]
            }, {
                date: '2022-03-06T13:34:22.603Z',
                title: 'Био-марсианский краторный space бургер',
                _id: '6224b85e25b9a4001b6e2f23',
                number: 11174,
                status: 'created',
                ingredients: [{...bun1, qty: 1}, {...meat2, qty: 1}]
            }],
            wsProfileConnected: false,
            viewedOrder: null,
            profileItemModalVisible: false
        })
    })

});