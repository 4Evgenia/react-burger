import type { TOrderActions } from '../actions/order';
import {
    SUBMIT_ORDER_FAILED,
    SUBMIT_ORDER_REQUEST,
    SUBMIT_ORDER_SUCCESS,
    HIDE_MODAL
} from '../constants';

type TOrderState = {
    orderId: number | null,
    orderRequest: boolean,
    orderFailed: boolean,
    orderModalVisible: boolean
}

const initialState : TOrderState = {
    orderId: null,
    orderRequest: false,
    orderFailed: false,
    orderModalVisible: false
}

export const orderReducer = (state = initialState, action: TOrderActions):TOrderState => {
    switch (action.type) {
        case SUBMIT_ORDER_REQUEST: {
            return {
                ...state, orderRequest: true
            };
        }
        case SUBMIT_ORDER_SUCCESS: {
            return {
                ...state, orderRequest: false, orderFailed: false, orderId: action.orderId, orderModalVisible: true
            };
        }
        case SUBMIT_ORDER_FAILED: {
            return {
                ...state, orderRequest: false, orderFailed: true
            }
        }
        case HIDE_MODAL: {
            return {
                ...state, orderModalVisible: false, orderId: null
            }
        }
        default: {
            return state;
        }
    }
}