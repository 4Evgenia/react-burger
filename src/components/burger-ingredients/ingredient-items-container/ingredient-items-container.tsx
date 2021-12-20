import React from "react";
import IngredientItems from '../ingredient-items/ingredient-items';
import PropTypes from 'prop-types';
import {ingredientPropType} from '../../../utils/prop-type';
import {TABS} from '../../../models/constants';

const IngredientItemsContainer = (props:any) => {
    const ingredients:any = {};
    TABS.forEach((tab: any) => ingredients[tab.type] = props.ingredients.filter((i:any) => i.type === tab.type));

    return (
        <>
        { TABS.map((tab:any) => (<IngredientItems 
            title={tab.displayName} 
            key={tab.type}
            ingredients = { ingredients[tab.type] }
            onSelectIngredient = {props.onSelectIngredient} 
            />))
        }
        </>
    );
}

IngredientItemsContainer.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
    onSelectIngredient: PropTypes.func.isRequired
}

export default IngredientItemsContainer