import { postOrder } from '../../utils/api';

export const SUBMIT_ORDER_REQUEST = 'SUBMIT_ORDER_REQUEST';
export const SUBMIT_ORDER_SUCCESS = 'SUBMIT_ORDER_SUCCESS';
export const SUBMIT_ORDER_FAILED = 'SUBMIT_ORDER_FAILED';
export const HIDE_MODAL = 'HIDE_MODAL';

export function submitOrder(data: any){
    return function(dispatch:any){
        dispatch({
            type: SUBMIT_ORDER_REQUEST
        });
        postOrder(data).then(res => {
            if (res && res.success){
                dispatch({
                    type: SUBMIT_ORDER_SUCCESS,
                    orderId: res.order.number
                });
            } else {
                dispatch({
                    type: SUBMIT_ORDER_FAILED
                })
            }
        }).catch(e => {
            dispatch({
                type: SUBMIT_ORDER_FAILED
            })
       })
    };
}