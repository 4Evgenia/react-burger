import { fetchIngredients } from '../../utils/api';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const SHOW_INGREDIENT_DETAILS = 'SHOW_INGREDIENT_DETAILS';
export const HIDE_INGREDIENT_DETAILS = 'HIDE_INGREDIENT_DETAILS';
export const GET_INGREDIENT_BY_ID = 'GET_INGREDIENT_BY_ID';
export const CHANGE_TAB = 'CHANGE_TAB';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';

export function getIngredients() {
    return function (dispatch: any) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });
        fetchIngredients().then(res => {
            if (res && res.success) {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    ingredients: res.data
                });
            } else {
                dispatch({
                    type: GET_INGREDIENTS_FAILED
                })
            }
        }).catch(e => {
            dispatch({
                type: GET_INGREDIENTS_FAILED
            })
        })
    };
}