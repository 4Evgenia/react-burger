import React from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, Button  } from "@ya.praktikum/react-developer-burger-ui-components";
import './burger-constructor.css';
import TotalOrderSum from './total-order-sum/total-order-sum';
import { BurgerConstructorContext } from '../utils/burger-constructor-context';

const BurgerConstructor = (props:any) => 
{
    const {selectedIngredients} = React.useContext(BurgerConstructorContext) as any;
    const calcSuffix = (index: number) => index === 0 ? "(вверх)" : index === selectedIngredients.length - 1 ? "(низ)" : "";
    const calcType = (index: number) => index === 0 ? "top" : index === selectedIngredients.length - 1 ? "bottom" : undefined;

    return (
        <section className="container ml-10 mt-25 pr-5">
            <div className="elements scroll pr-10">
                {selectedIngredients.map((item:any, index: number) => {
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
                <TotalOrderSum prices={selectedIngredients.map((item:any) => item.price)} />
                <div>
                    <Button type="primary" size="medium" onClick={props.submitOrder}>
                        Оформить
                    </Button>
                </div>
            </div>
        </section>
    );
}

BurgerConstructor.propTypes = {
     submitOrder: PropTypes.func.isRequired
}

export default BurgerConstructor;