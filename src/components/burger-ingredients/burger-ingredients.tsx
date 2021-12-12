import React from 'react';
import PropTypes from 'prop-types';
import {ingredientPropType} from '../utils/prop-type';
import { ConstructorElement, Button  } from "@ya.praktikum/react-developer-burger-ui-components";
import './burger-ingredients.css';
import TotalOrderSum from './total-sum/total-order-sum';

const BurgerIngredient = (props:any) => 
{
    const calcSuffix = (index: number) => index === 0 ? "(вверх)" : index === props.selectedIngredients.length - 1 ? "(низ)" : "";
    const calcType = (index: number) => index === 0 ? "top" : index === props.selectedIngredients.length - 1 ? "bottom" : undefined;

    return (
        <section className="container ml-10 mt-25 pr-5">
            <div className="elements scroll pr-10">
                {props.selectedIngredients.map((item:any, index: number) => {
                    return (
                        <ConstructorElement key={index}
                            type={ calcType(index) } 
                            isLocked={item.is_locked} 
                            text={`${item.name} ${calcSuffix(index)}`} 
                            price={item.price} 
                            thumbnail={item.image} />
                    );
                })}
            </div>
            <div className="mt-10 summary">
                <TotalOrderSum prices={props.selectedIngredients.map((item:any) => item.price)} />
                <div>
                    <Button type="primary" size="medium" onClick={props.submitOrder}>
                        Оформить
                    </Button>
                </div>
            </div>
        </section>
    );
}

BurgerIngredient.propTypes = {
     selectedIngredients: PropTypes.arrayOf(ingredientPropType).isRequired,
     submitOrder: PropTypes.func.isRequired
}

export default BurgerIngredient;