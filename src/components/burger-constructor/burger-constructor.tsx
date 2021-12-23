import React from 'react';
import { ConstructorElement, Button  } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css';
import TotalOrderSum from './total-order-sum/total-order-sum';
import { useDispatch, useSelector } from 'react-redux';
import { submitOrder } from '../../services/actions/order';
import { ADD_INGREDIENT, MOVE_INGREDIENT } from '../../services/actions/burger';
import { useDrop } from 'react-dnd';
import BurgerConstructorElement from './burger-constructor-element';

const BurgerConstructor = (props:any) => 
{
    const dispatch = useDispatch();

    const {
        selectedIngredients,
        selectedBun
    } = useSelector((state:any) => state.burger);

    const onOrderSubmitted = () => {
        const order = [...selectedIngredients, selectedBun, selectedBun];
        dispatch(submitOrder(order));
    }

    const moveIngredient = (dragIndex:number, hoverIndex:number) => {
        dispatch({type: MOVE_INGREDIENT, dragIndex:dragIndex, hoverIndex: hoverIndex });
    }

    const [ , dropTarget] = useDrop({
        accept: 'ingredient',
        drop(item:any){
            dispatch({type: ADD_INGREDIENT, selectedIngredient: item.ingredient});
        }
    })

    return (
        <section className={`${styles.container} ml-10 mt-25 pr-5`}>
            <div className={`${styles.elements} ${styles.scroll}`} ref={dropTarget}>
                <>
                <div className={styles.constructorElementContainer}>
                    <div className={styles.nonDragContainer}></div>
                    {selectedBun && (<ConstructorElement type="top" isLocked={true} text={`${selectedBun.name} (верх)`} price={selectedBun.price} thumbnail={selectedBun.image} />)}
                </div>
                <div className={`${styles.selectedIngredients} pr-10`}>
                    {selectedIngredients.map((item:any, index:number) => <BurgerConstructorElement
                            item={item}
                            index={index} 
                            key={`${item._id}_${item.qty}`} 
                            moveIngredient={moveIngredient}/>)}
                </div>
                <div className={styles.constructorElementContainer}>
                    <div className={styles.nonDragContainer}></div>
                    {selectedBun && (<ConstructorElement type="bottom" isLocked={true} text={`${selectedBun.name} (низ)`} price={selectedBun.price} thumbnail={selectedBun.image} />)}
                </div>
                </>
            </div>
            <div className={`mt-10 ${styles.summary}`}>
                <TotalOrderSum prices={selectedIngredients.concat({...selectedBun}, {...selectedBun}).map((item:any) => item.price)} />
                <div>
                    <Button type="primary" size="medium" onClick={onOrderSubmitted}>
                        Оформить
                    </Button>
                </div>
            </div>
        </section>
    );
}

export default BurgerConstructor;