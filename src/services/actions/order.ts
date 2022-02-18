import { IIngredient } from '../../models/models';
import { postOrder } from '../../utils/api';
import {
    SUBMIT_ORDER_REQUEST,
    SUBMIT_ORDER_SUCCESS,
    SUBMIT_ORDER_FAILED,
    HIDE_MODAL
} from '../constants';
import { AppDispatch, AppThunk } from '../types';

export interface ISubmitOrderRequestAction {
    readonly type: typeof SUBMIT_ORDER_REQUEST;
}

export interface ISubmitOrderSuccessAction {
    readonly type: typeof SUBMIT_ORDER_SUCCESS;
    readonly orderId: number;
}

export interface ISubmitOrderFailedAction {
    readonly type: typeof SUBMIT_ORDER_FAILED;
}

export interface IHideModalAction {
    readonly type: typeof HIDE_MODAL;
}

export const submitOrder: AppThunk = (data: IIngredient[]) => (dispatch: AppDispatch) => {
    dispatch(submitOrderRequest());
    postOrder(data).then(res => {
        if (res && res.success) {
            dispatch(submitOrderSuccess(res.order.number));
        } else {
            dispatch(submitOrderFailed());
        }
    }).catch(e => {
        dispatch(submitOrderFailed());
    })
}

// Генераторы экшенов
export const submitOrderRequest = (): ISubmitOrderRequestAction => ({
    type: SUBMIT_ORDER_REQUEST
});

export const submitOrderSuccess = (orderId: number): ISubmitOrderSuccessAction => ({
    type: SUBMIT_ORDER_SUCCESS,
    orderId
});

export const submitOrderFailed = (): ISubmitOrderFailedAction => ({
    type: SUBMIT_ORDER_FAILED
});

export const hideModal = (): IHideModalAction => ({
    type: HIDE_MODAL
});



export type TOrderActions = ISubmitOrderRequestAction
    | ISubmitOrderSuccessAction
    | ISubmitOrderFailedAction
    | IHideModalAction;