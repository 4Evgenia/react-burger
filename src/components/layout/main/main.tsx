import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import mainAreaStyles from './main.module.css';
import BurgerConstructor from '../../burger-constructor/burger-constructor';
import BurgerIngredient from '../../burger-ingredients/burger-ingredients';
import OrderDetails from '../../order-details/order-details';
import Modal from '../modal/modal';
import { HIDE_MODAL } from '../../../services/actions/order';


const Main = () => {
    const dispatch = useDispatch();

    const {
        orderId,
        orderModalVisible
    } = useSelector((state:any) => state.order);
    
    const onOrderModalClose = () => {
        dispatch({type: HIDE_MODAL});
    }

    return (<main className={mainAreaStyles.main}>
        <BurgerIngredient />
        <BurgerConstructor />
        {
            orderId && (<Modal visible = {orderModalVisible} onCancel={onOrderModalClose}>
                            <OrderDetails order={{_id: orderId}} />
                        </Modal>)
        }
    </main>)
}

export default Main
