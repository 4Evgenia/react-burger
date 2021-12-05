import React from 'react'
import './constructor-item.css'
import Ingredient from '../../../models/ingredient';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const ConstructorItem = (props:Ingredient) => (
    <div className="item mt-6 ml-4 mr-6">
        <img src={props.image} alt={props.name}/>
        <div className="text text_type_main-default mt-1">
            <span className="price pr-2">{props.price}</span>
            <CurrencyIcon type="primary" />
        </div>
        <div className="text text_type_main-default mt-1">{props.name}</div>
    </div>
)

export default ConstructorItem; 