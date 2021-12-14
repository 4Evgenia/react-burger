import React from "react";
import IngredientItems from '../ingredient-items/ingredient-items';
import PropTypes from 'prop-types';
import {ingredientPropType, tabPropType} from '../../utils/prop-type';

const IngredientItemsContainer = (props:any) => {
    const ingredients:any = {};
    props.tabs.forEach((tab: any) => ingredients[tab.type] = props.ingredients.filter((i:any) => i.type === tab.type));

    return (
        <>
        { props.tabs.map((tab:any) => (<IngredientItems 
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
    tabs: PropTypes.arrayOf(tabPropType).isRequired,
    onSelectIngredient: PropTypes.func.isRequired
}

export default IngredientItemsContainer