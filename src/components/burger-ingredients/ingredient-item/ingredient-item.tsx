import React, { FC } from 'react'
import styles from './ingredient-item.module.css'
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';
import { IIngredient } from '../../../models/models';
import { Location } from 'history';

export type TSelectIngredientFunc = (ingredient:IIngredient) => void;

export type TIngredientItemProps = {
    ingredient: IIngredient;
    onSelectIngredient: TSelectIngredientFunc;
}


const IngredientItem: FC<TIngredientItemProps> = ({ingredient, onSelectIngredient}) => {
    const selectIngredient = () => onSelectIngredient(ingredient);
    const location = useLocation<Location>();

    const [, ref] = useDrag({
        type: 'ingredient',
        item: { ingredient }
    })

    return (
            <div className={`${styles.item} mt-6 ml-4 mr-6`} onClick={selectIngredient} ref={ref}>
                <div className={styles.counterContainer}>
                    { ingredient.qty > 0 && (<Counter count={ingredient.qty} size="default" />)}
                </div>
                <Link to={{pathname: `/ingredients/${ingredient._id}`, state: {background: location}}}>
                <img src={ingredient.image} alt={ingredient.name}/>
                <div className={`text text_type_main-default mt-1 ${styles.priceContainer}`}>
                    <span className={`${styles.price} pr-2 text text_type_digits-default`}>{ingredient.price}</span>
                    <CurrencyIcon type="primary" />
                </div>
                </Link>
                <div className={`${styles.title} text text_type_main-default mt-1`}>{ingredient.name}</div>
            </div>
    )
}

export default IngredientItem;