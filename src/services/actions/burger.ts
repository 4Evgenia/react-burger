import { fetchIngredients } from '../../utils/api';
import { IIngredient } from '../../models/models';
import {
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENT_BY_ID,
    GET_INGREDIENTS_REQUEST,
    SHOW_INGREDIENT_DETAILS,
    HIDE_INGREDIENT_DETAILS,
    CHANGE_TAB,
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    MOVE_INGREDIENT
} from '../constants';
import { AppDispatch, AppThunk } from '../types';

export interface IGetIngredientsSuccessAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly ingredients: ReadonlyArray<IIngredient>;
}

export interface IGetIngredientsFailedAction {
    readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IGetIngredientByIdAction {
    readonly type: typeof GET_INGREDIENT_BY_ID;
    readonly _id: string;
}

export interface IGetIngredientsRequestAction {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IShowIngredientDetailsAction {
    readonly type: typeof SHOW_INGREDIENT_DETAILS;
    readonly selectedIngredient: IIngredient;
}

export interface IChangeTabAction {
    readonly type: typeof CHANGE_TAB;
    readonly selectedTab: string;
}

export interface IAddIngredientAction {
    readonly type: typeof ADD_INGREDIENT;
    readonly selectedIngredient: IIngredient;
    readonly guid: string;
}

export interface IRemoveIngredientAction {
    readonly type: typeof REMOVE_INGREDIENT;
    readonly removedIngredient: IIngredient;
}

export interface IMoveIngredientAction {
    readonly type: typeof MOVE_INGREDIENT;
    readonly dragIndex: number;
    readonly hoverIndex: number;
}

export interface IHideIngredientDetailsAction {
    readonly type: typeof HIDE_INGREDIENT_DETAILS;
}

export const getIngredients: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch(getIngredientsRequest());
    fetchIngredients().then(res => {
        if (res && res.success) {
            dispatch(getIngredientsSuccess(res.data));
        } else {
            dispatch(getIngredientsFailed());
        }
    }).catch(e => {
        dispatch(getIngredientsFailed());
    })
}

// Генераторы экшенов
export const addIngredient = (selectedIngredient: IIngredient, guid: string): IAddIngredientAction => ({
    type: ADD_INGREDIENT,
    guid,
    selectedIngredient
});

export const moveIngredient = (dragIndex: number, hoverIndex: number): IMoveIngredientAction => ({
    type: MOVE_INGREDIENT,
    dragIndex,
    hoverIndex
});

export const getIngredientsSuccess = (ingredients: ReadonlyArray<IIngredient>): IGetIngredientsSuccessAction => ({
    type: GET_INGREDIENTS_SUCCESS,
    ingredients
});

export const getIngredientsFailed = (): IGetIngredientsFailedAction => ({
    type: GET_INGREDIENTS_FAILED
});

export const getIngredientById = (_id: string): IGetIngredientByIdAction => ({
    type: GET_INGREDIENT_BY_ID,
    _id
});

export const getIngredientsRequest = (): IGetIngredientsRequestAction => ({
    type: GET_INGREDIENTS_REQUEST
});

export const changeTab = (selectedTab: string): IChangeTabAction => ({
    type: CHANGE_TAB,
    selectedTab
});

export const removeIngredient = (removedIngredient: IIngredient): IRemoveIngredientAction => ({
    type: REMOVE_INGREDIENT,
    removedIngredient
});

export const hideIngredientDetails = (): IHideIngredientDetailsAction => ({
    type: HIDE_INGREDIENT_DETAILS
});

export const showIngredientDetails = (selectedIngredient: IIngredient): IShowIngredientDetailsAction => ({
    type: SHOW_INGREDIENT_DETAILS,
    selectedIngredient
});

export type TBurgerActions = IGetIngredientsSuccessAction
    | IGetIngredientsFailedAction
    | IGetIngredientByIdAction
    | IGetIngredientsRequestAction
    | IShowIngredientDetailsAction
    | IChangeTabAction
    | IAddIngredientAction
    | IRemoveIngredientAction
    | IMoveIngredientAction
    | IHideIngredientDetailsAction;