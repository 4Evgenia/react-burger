import React from 'react';
import styles from './empty-burger.module.css';
import { InfoIcon  } from "@ya.praktikum/react-developer-burger-ui-components";

const EmptyBurger = () => {
    return (
        <div className={`${styles.emptyBurgerContainer} text text_type_main-default p-5`}>
            <div className='pr-2'><InfoIcon type="primary" /></div>
            <div>Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа.</div>
        </div>
    );
}

export default EmptyBurger;
