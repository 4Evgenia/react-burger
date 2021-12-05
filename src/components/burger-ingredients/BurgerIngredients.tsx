import React from 'react';
import Ingredient from '../../models/Ingredient';
import { ConstructorElement, Button, CurrencyIcon  } from "@ya.praktikum/react-developer-burger-ui-components";
import './burger-ingredients.css';

interface IBurgerIngredientProps{
    selectedIngredients: Array<Ingredient>
}

const BurgerIngredient = (props:IBurgerIngredientProps) => 
    (
        <section className="container ml-10 mt-25">
            <div className="elements scroll pr-10">
                {props.selectedIngredients.map((item, index) => {
                    let suffix = index == 0 ? "(вверх)" : index === props.selectedIngredients.length - 1 ? "(низ)" : "";
                    return (
                        <ConstructorElement key={item.id}
                            type={ index == 0 ? "top" : index === props.selectedIngredients.length - 1 ? "bottom" : undefined } 
                            isLocked={item.isLocked} 
                            text={`${item.name} ${suffix}`} 
                            price={item.price} 
                            thumbnail={item.image} />
                    );
                })}
            </div>
            <div className="mt-10 summary">
                <div className="text text_type_main-medium mr-10">
                    <span className="price mr-2">{props.selectedIngredients.reduce(((acc, ing) => ing.price + acc), 0)}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <div>
                <Button type="primary" size="medium">
                    Оформить
                </Button>
                </div>
            </div>
        </section>
    );


    export default BurgerIngredient;