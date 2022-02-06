import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import constructorStyles from './constructor.module.css';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import BurgerIngredient from '../components/burger-ingredients/burger-ingredients';
import OrderDetails from '../components/order-details/order-details';
import Modal from '../components/layout/modal/modal';
import { HIDE_MODAL } from '../services/actions/order';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';


export const ConstructorPage: FC = () => {
    const dispatch = useDispatch();

    const {
        orderId,
        orderModalVisible
    } = useSelector((state:any) => state.order);
    
    const onOrderModalClose = () => {
        dispatch({type: HIDE_MODAL});
    }

    return (<main className={constructorStyles.container}>
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
