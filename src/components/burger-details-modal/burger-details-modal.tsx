import React, { useEffect, FC } from 'react';
import IngredientDetails from '../burger-ingredients/details/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Modal from '../layout/modal/modal';
import { GET_INGREDIENT_BY_ID, HIDE_INGREDIENT_DETAILS } from '../../services/actions/burger';
import { TIngredientParam } from '../../models/models';


const BurgerDetailsModal: FC = () => {
    const { viewedIngredient, modalVisible, ingredients } = useSelector((state: any) => state.burger);
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams<TIngredientParam>();

    useEffect(() => {
        if (id && ingredients.length !== 0) {
            dispatch({ type: GET_INGREDIENT_BY_ID, _id: id });
        }
    }, [dispatch, ingredients, id]);

    const onCancelSelectIngredient = () => {
        history.goBack();
        dispatch({ type: HIDE_INGREDIENT_DETAILS });
    }

    return (<Modal visible={modalVisible} title="Детали ингредиента" onCancel={onCancelSelectIngredient}>
        <IngredientDetails ingredient={viewedIngredient} />
    </Modal>);
}

export default BurgerDetailsModal;
