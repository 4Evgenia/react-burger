import React from 'react'
import './constructor-item.css'
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import {ingredientPropType} from '../../utils/prop-type';


const ConstructorItem = ({ingredient, onSelectIngredient}:any) => {
    const selectIngredient = () => onSelectIngredient(ingredient);

    return (
        <div className="item mt-6 ml-4 mr-6" onClick={selectIngredient}>
            <img src={ingredient.image} alt={ingredient.name}/>
            <div className="text text_type_main-default mt-1">
                <span className="price pr-2">{ingredient.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <div className="title text text_type_main-default mt-1">{ingredient.name}</div>
        </div>
    )
}

ConstructorItem.propTypes = {
    ingredient: ingredientPropType,
    onSelectIngredient: PropTypes.func
}

export default ConstructorItem;