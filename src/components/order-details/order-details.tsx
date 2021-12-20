import React from 'react';
import {orderPropType} from '../../utils/prop-type';
import styles from './order-details.module.css';
import { CheckMarkIcon  } from "@ya.praktikum/react-developer-burger-ui-components";

const OrderDetails = ({order}:any) => (
    <article>
        <main>
            <h1 className="text text_type_digits-large mb-8">{order._id}</h1>
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


OrderDetails.propTypes = {
    order: orderPropType.isRequired
}
export default OrderDetails;
