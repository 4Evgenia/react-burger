import React from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, Button, DragIcon  } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css';
import TotalOrderSum from './total-order-sum/total-order-sum';
import { BurgerConstructorContext } from '../../services/burger-constructor-context';

const BurgerConstructor = (props:any) => 
{
    const {selectedIngredients, selectedBun} = React.useContext(BurgerConstructorContext) as any;

    return (
        <section className={`${styles.container} ml-10 mt-25 pr-5`}>
            <div className={`${styles.elements} ${styles.scroll}`}>
                <>
                <div className={styles.constructorElementContainer}>
                    <div className={styles.nonDragContainer}></div>
                    <ConstructorElement type="top" isLocked={true} text={`${selectedBun.name} (верх)`} price={selectedBun.price} thumbnail={selectedBun.image} />
                </div>
                <div className={`${styles.selectedIngredients} pr-10`}>
                    {selectedIngredients.map((item:any, index: number) => {
                        return (
                            <div className={styles.constructorElementContainer} key={item._id}>
                                <div className="mr-5"><DragIcon type="primary" /></div>
                                <ConstructorElement
                                    text={item.name}
                                    price={item.price} 
                                    thumbnail={item.image} />
                            </div>
                        );
                        })}
                </div>
                <div className={styles.constructorElementContainer}>
                    <div className={styles.nonDragContainer}></div>
                    <ConstructorElement type="bottom" isLocked={true} text={`${selectedBun.name} (низ)`} price={selectedBun.price} thumbnail={selectedBun.image} />
                </div>
                </>
            </div>
            <div className={`mt-10 ${styles.summary}`}>
                <TotalOrderSum prices={selectedIngredients.concat({...selectedBun}, {...selectedBun}).map((item:any) => item.price)} />
                <div>
                    <Button type="primary" size="medium" onClick={props.submitOrder}>
                        Оформить
                    </Button>
                </div>
            </div>
        </section>
    );
}

BurgerConstructor.propTypes = {
     submitOrder: PropTypes.func.isRequired
}

export default BurgerConstructor;