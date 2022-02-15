import { IIngredient } from '../../models/models';
import { TBurgerActions } from '../actions/burger';
import { TOrderActions } from '../actions/order';
import {
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    SHOW_INGREDIENT_DETAILS,
    HIDE_INGREDIENT_DETAILS,
    CHANGE_TAB,
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    MOVE_INGREDIENT,
    GET_INGREDIENT_BY_ID,
    SUBMIT_ORDER_SUCCESS
} from '../constants';
import { TABS, BUN } from '../../models/constants';

type TBurgerState = {
    ingredients: IIngredient[],
    ingredientRequest: boolean,
    ingredientFailed: boolean,
    viewedIngredient: IIngredient | null,
    activeTab: string,
    modalVisible: boolean,
    selectedIngredients: IIngredient[],
    selectedBun: IIngredient | null
}

const initialState : TBurgerState = {
    ingredients: [],
    ingredientRequest: false,
    ingredientFailed: false,
    viewedIngredient: null,
    activeTab: TABS[0].type,
    modalVisible: false,
    selectedIngredients: [],
    selectedBun: null
}

export const burgerReducer = (state = initialState, action: TBurgerActions | TOrderActions):TBurgerState => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state, ingredientRequest: true
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredientFailed: false,
                ingredientRequest: false,
                ingredients: action.ingredients.map((item: IIngredient) => {
                    return { ...item, qty: 0 }
                })
            };
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state, ingredientFailed: true, ingredientRequest: false
            };
        }
        case SHOW_INGREDIENT_DETAILS: {
            return {
                ...state, viewedIngredient: action.selectedIngredient, modalVisible: true
            };
        }
        case HIDE_INGREDIENT_DETAILS: {
            return {
                ...state, viewedIngredient: null, modalVisible: false
            };
        }
        case GET_INGREDIENT_BY_ID: {
            return {
                ...state, viewedIngredient: state.ingredients.filter((i: IIngredient) => i._id === action._id)[0], modalVisible: true
            }
        }
        case CHANGE_TAB: {
            return {
                ...state, activeTab: action.selectedTab
            }
        }
        case ADD_INGREDIENT: {
            const isBun = action.selectedIngredient.type === BUN;
            return {
                ...state,
                selectedBun: isBun ? action.selectedIngredient : state.selectedBun,
                selectedIngredients: isBun ?
                    state.selectedIngredients :
                    state.selectedIngredients.concat({ ...action.selectedIngredient, guid: action.guid }),
                ingredients: [...state.ingredients].map((item: IIngredient) => {
                    // увеличить счетчик на 1 для выбранного ингредиента и на 2 для булок
                    if (item._id === action.selectedIngredient._id)
                        return { ...item, qty: isBun ? (item.qty + 2) : ++item.qty };
                    // сбросить счетчик на предыдущей булке
                    else if (isBun && state.selectedBun !== null && item._id === state.selectedBun._id)
                        return { ...item, qty: 0 }
                    return item;
                })
            }
        }
        case REMOVE_INGREDIENT: {
            if (action.removedIngredient.type === BUN)
                return { ...state };
            return {
                ...state,
                selectedIngredients: [...state.selectedIngredients]
                    .filter(item => item.guid !== action.removedIngredient.guid),
                ingredients: [...state.ingredients].map(item => item._id === action.removedIngredient._id ? { ...item, qty: --item.qty } : item)
            }
        }
        case MOVE_INGREDIENT: {
            const upwardDrag = action.dragIndex > action.hoverIndex;
            const draggableIngredient = state.selectedIngredients[action.dragIndex];
            const hoveredIngredient = state.selectedIngredients[action.hoverIndex];

            return {
                ...state, selectedIngredients: upwardDrag ?
                    [...state.selectedIngredients.slice(0, action.hoverIndex),
                        draggableIngredient, hoveredIngredient,
                    ...state.selectedIngredients.slice(action.dragIndex + 1)] :
                    [...state.selectedIngredients.slice(0, action.dragIndex),
                        hoveredIngredient, draggableIngredient,
                    ...state.selectedIngredients.slice(action.hoverIndex + 1)]
            };
        }
        case SUBMIT_ORDER_SUCCESS: {
            return {
                ...state,
                selectedIngredients: [],
                selectedBun: null,
                ingredients: [...state.ingredients].map(item => { return { ...item, qty: 0 } })
            }
        }
        default: {
            return state;
        }
    }
}