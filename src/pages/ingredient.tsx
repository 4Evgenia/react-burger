import React, {useEffect, FC} from 'react';
import IngredientDetails from '../components/burger-ingredients/details/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GET_INGREDIENT_BY_ID } from '../services/actions/burger';
import styles from './page.module.css';
import { TIngredientParam } from '../models/models';

export const IngredientPage:FC = () => {
    const { viewedIngredient, ingredients } = useSelector((state:any) => state.burger);
    const dispatch = useDispatch();
    const { id } = useParams<TIngredientParam>();

    useEffect(() => {
        dispatch({type: GET_INGREDIENT_BY_ID, _id: id });
    }, [dispatch, ingredients, id]);
    
    return (
    <section className={styles.container}>
        <IngredientDetails ingredient={viewedIngredient} />
    </section>);
}