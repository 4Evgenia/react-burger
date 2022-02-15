import React, { FC } from 'react';
import { ConstructorElement, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css';
import TotalOrderSum from './total-order-sum/total-order-sum';
import { useDispatch, useSelector } from '../../services/types/hooks';
import { submitOrder } from '../../services/actions/order';
import { addIngredient, moveIngredient } from '../../services/actions/burger';
import { useDrop } from 'react-dnd';
import BurgerConstructorElement from './burger-constructor-element';
import EmptyBurger from './empty-burger';
import ErrorMessage from '../shared/error-message';
import { NO_BUN_IN_ORDER, ROUTES } from '../../models/constants';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom';
import Loader from '../shared/loader';
import { IIngredient } from '../../models/models';

const BurgerConstructor: FC = () => {
    const dispatch = useDispatch();

    const {
        selectedIngredients,
        selectedBun
    } = useSelector(state => state.burger);

    const { user, getUserSuccess } = useSelector(state => state.auth);
    const { orderRequest } = useSelector(state => state.order);
    const history = useHistory();

    const onOrderSubmitted = () => {
        if (getUserSuccess && user) {
            const order = [...selectedIngredients, selectedBun, selectedBun];
            dispatch(submitOrder(order));
        } else {
            history.push(ROUTES.Login.path);
        }
    }

    const onMoveIngredient = (dragIndex: number, hoverIndex: number) => {
        dispatch(moveIngredient(dragIndex, hoverIndex));
    }

    const [, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(item: { ingredient: IIngredient }) {
            dispatch(addIngredient(item.ingredient, uuidv4()));
        }
    })

    return (
        <section className={`${styles.container} ml-10 mt-25 pr-5`}>
            {!selectedBun && selectedIngredients.length !== 0 && <ErrorMessage message={NO_BUN_IN_ORDER} />}
            <div className={`${styles.elements} ${styles.scroll}`} ref={dropTarget}>
                {selectedIngredients.length === 0 && !selectedBun ? (<EmptyBurger />) :
                    (
                        <>
                            <div className={styles.constructorElementContainer}>
                                <div className={styles.nonDragContainer}></div>
                                {selectedBun && (<ConstructorElement type="top" isLocked={true} text={`${selectedBun.name} (верх)`} price={selectedBun.price} thumbnail={selectedBun.image} />)}
                            </div>
                            <div className={`${styles.selectedIngredients} pr-10`}>
                                {selectedIngredients.map((item: IIngredient, index: number) => <BurgerConstructorElement
                                    item={item}
                                    index={index}
                                    key={item.guid}
                                    moveIngredient={onMoveIngredient} />)}
                            </div>
                            <div className={styles.constructorElementContainer}>
                                <div className={styles.nonDragContainer}></div>
                                {selectedBun && (<ConstructorElement type="bottom" isLocked={true} text={`${selectedBun.name} (низ)`} price={selectedBun.price} thumbnail={selectedBun.image} />)}
                            </div>
                        </>
                    )}
            </div>
            {(selectedIngredients.length !== 0 || selectedBun) && (<div className={`mt-10 ${styles.summary}`}>
                <TotalOrderSum prices={selectedIngredients.concat([{ ...selectedBun }, { ...selectedBun }] as ConcatArray<IIngredient>)
                    .map((item: IIngredient) => item === null ? 0 : item.price)} />
                <div>
                    {!orderRequest && (<Button type="primary" size="medium" onClick={onOrderSubmitted} disabled={!selectedBun}>
                        Оформить
                    </Button>)}
                </div>
                <div className={styles.loader}>{orderRequest && <Loader />}</div>
            </div>)}
        </section>
    );
}

export default BurgerConstructor;