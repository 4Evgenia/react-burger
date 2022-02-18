import React, { FC } from 'react';
import { useDispatch, useSelector } from '../services/types/hooks';
import constructorStyles from './constructor.module.css';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import BurgerIngredient from '../components/burger-ingredients/burger-ingredients';
import OrderDetails from '../components/order-details/order-details';
import Modal from '../components/layout/modal/modal';
import { hideModal } from '../services/actions/order';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';


export const ConstructorPage: FC = () => {
    const dispatch = useDispatch();

    const {
        orderId,
        orderModalVisible
    } = useSelector(state => state.order);

    const onOrderModalClose = () => {
        dispatch(hideModal());
    }

    return (<main className={constructorStyles.container}>
        <DndProvider backend={HTML5Backend}>
            <BurgerIngredient />
            <BurgerConstructor />
        </DndProvider>
        {
            orderId && (<Modal visible={orderModalVisible} onCancel={onOrderModalClose}>
                <OrderDetails order={{ _id: orderId }} />
            </Modal>)
        }
    </main>)
}
