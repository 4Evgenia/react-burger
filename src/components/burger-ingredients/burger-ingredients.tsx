import React from 'react';
import PropTypes from 'prop-types';
import {ingredientPropType} from '../utils/prop-type';
import { ConstructorElement, Button, CurrencyIcon  } from "@ya.praktikum/react-developer-burger-ui-components";
import './burger-ingredients.css';

const BurgerIngredient = (props:any) => 
    (
        <section className="container ml-10 mt-25 pr-5">
            <div className="elements scroll pr-10">
                {props.selectedIngredients.map((item:any, index: number) => {
                    let suffix = index === 0 ? "(вверх)" : index === props.selectedIngredients.length - 1 ? "(низ)" : "";
                    return (
                        <ConstructorElement key={index}
                            type={ index === 0 ? "top" : index === props.selectedIngredients.length - 1 ? "bottom" : undefined } 
                            isLocked={item.is_locked} 
                            text={`${item.name} ${suffix}`} 
                            price={item.price} 
                            thumbnail={item.image} />
                    );
                })}
            </div>
            <div className="mt-10 summary">
                <div className="text text_type_main-medium mr-10">
                    <span className="price mr-2">{props.selectedIngredients.reduce(((acc:number, ing:any) => ing.price + acc), 0)}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <div>
                <Button type="primary" size="medium" onClick={props.submitOrder}>
                    Оформить
                </Button>
                </div>
            </div>
        </section>
    );

    BurgerIngredient.propTypes = {
        selectedIngredients: PropTypes.arrayOf(ingredientPropType).isRequired,
        submitOrder: PropTypes.func.isRequired
    }

export default BurgerIngredient;