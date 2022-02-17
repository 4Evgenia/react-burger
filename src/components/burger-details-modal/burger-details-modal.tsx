import React, { useEffect, FC } from 'react';
import IngredientDetails from '../burger-ingredients/details/ingredient-details';
import { useDispatch, useSelector } from '../../services/types/hooks';
import { useHistory, useParams } from 'react-router-dom';
import Modal from '../layout/modal/modal';
import { getIngredientById, hideIngredientDetails } from '../../services/actions/burger';
import { TIdParam } from '../../models/models';


const BurgerDetailsModal: FC = () => {
    const { viewedIngredient, modalVisible, ingredients } = useSelector(state => state.burger);
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams<TIdParam>();

    useEffect(() => {
        if (id && ingredients.length !== 0) {
            dispatch(getIngredientById(id));
        }
    }, [dispatch, ingredients, id]);

    const onCancelSelectIngredient = () => {
        history.goBack();
        dispatch(hideIngredientDetails());
    }

    return (<Modal visible={modalVisible} title="Детали ингредиента" onCancel={onCancelSelectIngredient}>
        <IngredientDetails ingredient={viewedIngredient} />
    </Modal>);
}

export default BurgerDetailsModal;
