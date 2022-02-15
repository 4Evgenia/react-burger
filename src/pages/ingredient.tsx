import React, { useEffect, FC } from 'react';
import IngredientDetails from '../components/burger-ingredients/details/ingredient-details';
import { useDispatch, useSelector } from '../services/types/hooks';
import { useParams } from 'react-router-dom';
import { getIngredientById } from '../services/actions/burger';
import styles from './page.module.css';
import { TIngredientParam } from '../models/models';

export const IngredientPage: FC = () => {
    const { viewedIngredient, ingredients } = useSelector(state => state.burger);
    const dispatch = useDispatch();
    const { id } = useParams<TIngredientParam>();

    useEffect(() => {
        dispatch(getIngredientById(id));
    }, [dispatch, ingredients, id]);

    return (
        <section className={styles.container}>
            <IngredientDetails ingredient={viewedIngredient} />
        </section>);
}