import React from 'react';
import styles from './ingredient-items.module.css';
import PropTypes from 'prop-types';
import {ingredientPropType} from '../../utils/prop-type';
import IngredientItem from '../ingredient-item/ingredient-item';


const IngredientItems = (props:any) => {
    return (
        <section className="mb-10">
            <div className="text text_type_main-medium">{props.title}</div>
              <div className={styles.container}>
                {props.ingredients.map((item:any) => (
                    <IngredientItem key={item._id} ingredient={item} onSelectIngredient={props.onSelectIngredient}/>
                ))}
            </div> 
        </section>
    );
}

IngredientItems.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
    title: PropTypes.string.isRequired,
    onSelectIngredient: PropTypes.func.isRequired
}

export default IngredientItems;