import React from 'react';
import PropTypes from 'prop-types';
import {orderPropType} from '../utils/prop-type';
import styles from './order-details.module.css';
import Modal from '../layout/modal/modal';
import { CheckMarkIcon  } from "@ya.praktikum/react-developer-burger-ui-components";

const OrderDetails = (props:any) => {
    const {order, visible, onCancel} = props;
    return (
        <Modal visible = {visible} onCancel={onCancel}>
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
        </Modal>
    );
}

OrderDetails.propTypes = {
    order: orderPropType.isRequired,
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
}
export default OrderDetails;
