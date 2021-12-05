import React from 'react';
import constructorItemsStyle from './constructor-items.module.css';
import Ingredient from '../../../models/ingredient';
import ConstructorItem from '../constructor-item/constructor-item';


interface IConstructorItemsProps{
    data: Array<Ingredient>,
    title: string
}

const ConstructorItems = (props:IConstructorItemsProps) => {
    return (
        <section className="mb-10">
            <div className="text text_type_main-medium">{props.title}</div>
              <div className={constructorItemsStyle.container}>
                {props.data.map(item => (
                    <ConstructorItem key={item.id} {...item}/>
                ))}
            </div> 
        </section>
    );
}



export default ConstructorItems;