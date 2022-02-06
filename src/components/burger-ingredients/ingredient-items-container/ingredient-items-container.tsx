import React, { FC } from "react";
import IngredientItems, { TIngredientsProps } from '../ingredient-items/ingredient-items';
import { TABS } from '../../../models/constants';
import { IIngredient, TTab, IngredientType } from "../../../models/models";

type TIterableIngredients = {
    [type in IngredientType]: Array<IIngredient>;
}

const IngredientItemsContainer: FC<TIngredientsProps> = (props) => {
    const ingredients: TIterableIngredients = { bun: [], sauce: [], main: [] };
    TABS.forEach((tab: TTab) => ingredients[tab.type] = props.ingredients.filter((i: IIngredient) => i.type === tab.type));

    return (
        <>
            {TABS.map((tab: TTab) => (<IngredientItems
                title={tab.displayName}
                key={tab.type}
                type={tab.type}
                ingredients={ingredients[tab.type]}
                onSelectIngredient={props.onSelectIngredient}
            />))
            }
        </>
    );
}

export default IngredientItemsContainer