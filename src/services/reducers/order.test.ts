import { TOrderState, orderReducer } from './order';

const initialState : TOrderState = {
    orderId: null,
    orderRequest: false,
    orderFailed: false,
    orderModalVisible: false
}

describe("Order reducer", () => {
    it('should handle SUBMIT_ORDER_REQUEST', () => {
        expect(orderReducer(initialState, {
            type: 'SUBMIT_ORDER_REQUEST'
        })).toEqual({
            ...initialState,
            orderRequest: true
        })
    })

    it('should handle SUBMIT_ORDER_SUCCESS', () => {
        expect(orderReducer(initialState, {
            type: 'SUBMIT_ORDER_SUCCESS',
            orderId: 11345
        })).toEqual({
            orderId: 11345,
            orderRequest: false,
            orderFailed: false,
            orderModalVisible: true
        })
    })

    it('should handle SUBMIT_ORDER_FAILED', () => {
        expect(orderReducer(initialState, {
            type: 'SUBMIT_ORDER_FAILED'
        })).toEqual({
            ...initialState,
            orderRequest: false,
            orderFailed: true
        })
    })

    it('should handle HIDE_MODAL', () => {
        expect(orderReducer({
            orderRequest: false,
            orderFailed: false,
            orderModalVisible: true,
            orderId: 11345
        }, {
            type: 'HIDE_MODAL'
        })).toEqual({
            orderRequest: false,
            orderFailed: false,
            orderModalVisible: false,
            orderId: null
        })
    })
})