import React, { FC } from 'react';
import styles from './order-details.module.css';
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IOrder } from '../../models/models';

type TOrderDetails = {
    order: IOrder;
}

const OrderDetails: FC<TOrderDetails> = ({ order }) => (
    <article>
        <main>
            <h1 className="text text_type_digits-large mb-8"><span className='orderId'>{order._id}</span></h1>
            <div className="text text_type_main-medium mb-15">
                <span className={styles.description}>идентификатор заказа</span>
            </div>
            <div className="mb-15">
                <CheckMarkIcon type="primary" />
            </div>
            <div className="text text_type_main-default mb-2">
                <span className={styles.description}>Ваш заказ начали готовить</span>
            </div>
            <div className="text text_type_main-default mb-15">
                <span className={styles.secondary}>Дождитесь готовности на орбитальной станции</span>
            </div>
        </main>
    </article>
);

export default OrderDetails;
