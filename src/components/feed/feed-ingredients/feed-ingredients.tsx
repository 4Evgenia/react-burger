import React, { FC } from "react";
import { IIngredient } from "../../../models/models";
import styles from './feed-ingredients.module.css';

export type TFeedIngredientsProps = {
    maxIngredients?: number;
    ingredients: Array<IIngredient>;
}

const FeedIngredients: FC<TFeedIngredientsProps> = ({ingredients, maxIngredients}) => {
    const maxIngredientsToDisplay = maxIngredients ?? 6;
    const allIngredientsDisplayed = maxIngredientsToDisplay >= ingredients.length;
    return (
        <div className={styles.ingredients}>
            {ingredients.map((ingredient, index) => {
                if (index < maxIngredientsToDisplay - 1 || ((index === maxIngredientsToDisplay - 1) && allIngredientsDisplayed)) {
                    return (
                        <div key={ingredient._id} style={{left: index*(-15), zIndex: maxIngredientsToDisplay - index}}
                            className={styles.imageContainer}>
                            <img src={ingredient.image_mobile} alt={ingredient.name}/>
                        </div>
                    )
                }
                else if (index === maxIngredientsToDisplay - 1 && !allIngredientsDisplayed) {
                    return (
                        <div key={ingredient._id} style={{left: index*(-15), zIndex: maxIngredientsToDisplay - index}}
                            className={styles.imageContainer}>
                            <img src={ingredient.image_mobile} style={{ opacity: 0.6 }} alt={ingredient.name} />
                            <div style={{opacity: 1}} className={`${styles.rest} text text_type_main-default`}>
                                +{ingredients.length - maxIngredientsToDisplay}
                            </div>
                        </div>
                    )
                }
                else return null;
            })}
        </div>
    );
}

export default FeedIngredients;