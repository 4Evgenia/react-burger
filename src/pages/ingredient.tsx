import React, {useEffect} from 'react';
import IngredientDetails from '../components/burger-ingredients/details/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GET_INGREDIENT_BY_ID, getIngredients } from '../services/actions/burger';
import styles from './page.module.css';

export const IngredientPage = () => {
    const { viewedIngredient, ingredients } = useSelector((state:any) => state.burger);
    const dispatch = useDispatch();
    const { id } = useParams() as any;

    useEffect(() => {
        if (ingredients.length === 0){
            dispatch(getIngredients());
        } 
        dispatch({type: GET_INGREDIENT_BY_ID, _id: id });
    }, [dispatch, ingredients]);
    
    return (
    <section className={styles.container}>
        <IngredientDetails ingredient={viewedIngredient} />
    </section>);
}