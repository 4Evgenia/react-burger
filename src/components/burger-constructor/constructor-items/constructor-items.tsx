import React from 'react';
import constructorItemsStyle from './constructor-items.module.css';
import PropTypes from 'prop-types';
import {ingredientPropType} from '../../utils/prop-type';
import ConstructorItem from '../constructor-item/constructor-item';


const ConstructorItems = (props:any) => {
    return (
        <section className="mb-10">
            <div className="text text_type_main-medium">{props.title}</div>
              <div className={constructorItemsStyle.container}>
                {props.data.map((item:any) => (
                    <ConstructorItem key={item._id} ingredient={item} onSelectIngredient={props.onSelectIngredient}/>
                ))}
            </div> 
        </section>
    );
}

ConstructorItems.propTypes = {
    data: PropTypes.arrayOf(ingredientPropType).isRequired,
    title: PropTypes.string.isRequired,
    onSelectIngredient: PropTypes.func.isRequired
}

export default ConstructorItems;