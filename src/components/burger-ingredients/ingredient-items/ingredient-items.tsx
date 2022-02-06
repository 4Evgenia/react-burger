import React, { FC } from 'react';
import styles from './ingredient-items.module.css';
import IngredientItem, { TSelectIngredientFunc } from '../ingredient-item/ingredient-item';
import { IIngredient } from '../../../models/models';

export type TIngredientsProps = {
    ingredients: ReadonlyArray<IIngredient>;
    onSelectIngredient: TSelectIngredientFunc;
}

type TIngredientItemsType = {
    type: string;
    title: string;
} & TIngredientsProps


const IngredientItems: FC<TIngredientItemsType> = (props) => {
    return (
        <section className="mb-10">
            <h3 className="text text_type_main-medium" id={props.type}>{props.title}</h3>
            <div className={styles.container}>
                {props.ingredients.map((item: IIngredient) => (
                    <IngredientItem key={item._id} ingredient={item} onSelectIngredient={props.onSelectIngredient} />
                ))}
            </div>
        </section>
    );
}

export default IngredientItems;