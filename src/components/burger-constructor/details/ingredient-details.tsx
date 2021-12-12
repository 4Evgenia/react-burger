import React from 'react';
import styles from './ingredient-details.module.css';
import PropTypes from 'prop-types';
import {ingredientPropType} from '../../utils/prop-type';
import Modal from '../../layout/modal/modal';

const IngredientDetails = ({ingredient, visible, onCancel}:any) => (
        <Modal visible = {visible} title="Детали ингредиента" onCancel={onCancel}>
            <article className={styles.container}>
                <figure className="mb-4">
                    <img src={ingredient.image_large} alt={ingredient.name}/>
                </figure>
                <section className="mb-8">
                    <h2 className="text text_type_main-medium">{ingredient.name}</h2>
                </section>
                <section className="mb-5">
                    <div className={styles.nutrientContainer}>
                        <section className="mr-5">
                            <div className={styles.nutrient}>
                                <div className="text text_type_main-default">Калории, ккал</div>
                                <div className="text text_type_digits-medium">{ingredient.calories}</div>
                            </div>
                        </section>
                        <section className="mr-5">
                            <div className={styles.nutrient}>
                                <div className="text text_type_main-default">Белки, г</div>
                                <div className="text text_type_digits-medium">{ingredient.proteins}</div>
                            </div>
                        </section>
                        <section className="mr-5">
                            <div className={styles.nutrient}>
                                <div className="text text_type_main-default">Жиры, г</div>
                                <div className="text text_type_digits-medium">{ingredient.fat}</div>
                            </div>
                        </section>
                        <section className="">
                            <div className={styles.nutrient}>
                                <div className="text text_type_main-default">Углеводы, г</div>
                                <div className="text text_type_digits-medium">{ingredient.carbohydrates}</div>
                            </div>
                        </section>
                    </div>
                </section>
            </article>
        </Modal>
    );

IngredientDetails.propTypes = {
    ingredient: ingredientPropType.isRequired,
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired
}

export default IngredientDetails;