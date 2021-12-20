import React from 'react'
import styles from './ingredient-item.module.css'
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import {ingredientPropType} from '../../utils/prop-type';


const IngredientItem = ({ingredient, onSelectIngredient}:any) => {
    const selectIngredient = () => onSelectIngredient(ingredient);

    return (
        <div className={`${styles.item} mt-6 ml-4 mr-6`} onClick={selectIngredient}>
            <img src={ingredient.image} alt={ingredient.name}/>
            <div className="text text_type_main-default mt-1">
                <span className={`${styles.price} pr-2`}>{ingredient.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <div className={`${styles.title} text text_type_main-default mt-1`}>{ingredient.name}</div>
        </div>
    )
}

IngredientItem.propTypes = {
    ingredient: ingredientPropType,
    onSelectIngredient: PropTypes.func
}

export default IngredientItem;