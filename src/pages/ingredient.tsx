import React, {useEffect} from 'react';
import IngredientDetails from '../components/burger-ingredients/details/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { Route, useParams, useHistory } from 'react-router-dom';
import { GET_INGREDIENT_BY_ID, getIngredients, HIDE_INGREDIENT_DETAILS } from '../services/actions/burger';
import styles from './page.module.css';
import Modal from '../components/layout/modal/modal';
import { ROUTES } from '../models/constants';

export const IngredientPage = () => {
    const { viewedIngredient, ingredients, modalVisible } = useSelector((state:any) => state.burger);
    const dispatch = useDispatch();
    const { id } = useParams() as any;
    const history = useHistory();

    const onCancelSelectIngredient = () => {
        history.replace({ pathname: ROUTES.Home.path });
        dispatch({type: HIDE_INGREDIENT_DETAILS});
    }

    useEffect(() => {
        if (ingredients.length === 0){
            dispatch(getIngredients());
        } 
        dispatch({type: GET_INGREDIENT_BY_ID, _id: id });
    }, [dispatch, ingredients]);
    
    return (
    <section className={styles.container}>
        <IngredientDetails ingredient={viewedIngredient} />

        <Route path={ROUTES.Ingredient.path}
                children={() => {
                    return (<Modal visible = {modalVisible} title="Детали ингредиента" onCancel={onCancelSelectIngredient}>
                                <IngredientDetails  ingredient={viewedIngredient} />
                            </Modal>);
                }} />
    </section>);
}