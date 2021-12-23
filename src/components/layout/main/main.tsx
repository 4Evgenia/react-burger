import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import mainAreaStyles from './main.module.css';
import BurgerConstructor from '../../burger-constructor/burger-constructor';
import BurgerIngredient from '../../burger-ingredients/burger-ingredients';
import OrderDetails from '../../order-details/order-details';
import Modal from '../modal/modal';
import { HIDE_MODAL } from '../../../services/actions/order';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';


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
        <DndProvider backend={HTML5Backend}>
            <BurgerIngredient />
            <BurgerConstructor />
        </DndProvider>
        {
            orderId && (<Modal visible = {orderModalVisible} onCancel={onOrderModalClose}>
                            <OrderDetails order={{_id: orderId}} />
                        </Modal>)
        }
    </main>)
}

export default Main
