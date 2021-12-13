import React from "react";
import ConstructorItems from '../constructor-items/constructor-items';
import PropTypes from 'prop-types';
import {ingredientPropType, tabPropType} from '../../utils/prop-type';

const constructorItemsContainer = (props:any) => {
    const ingredients:any = {};
    props.tabs.forEach((tab: any) => ingredients[tab.type] = props.ingredients.filter((i:any) => i.type === tab.type));

    return (
        <>
        { props.tabs.map((tab:any) => (<ConstructorItems 
            title={tab.displayName} 
            key={tab.type}
            ingredients = { ingredients[tab.type] }
            onSelectIngredient = {props.onSelectIngredient} 
            />))
        }
        </>
    );
}

constructorItemsContainer.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
    tabs: PropTypes.arrayOf(tabPropType).isRequired,
    onSelectIngredient: PropTypes.func.isRequired
}

export default constructorItemsContainer