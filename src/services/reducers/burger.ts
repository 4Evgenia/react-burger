import {
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    SHOW_INGREDIENT_DETAILS,
    HIDE_INGREDIENT_DETAILS,
    CHANGE_TAB,
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    MOVE_INGREDIENT
} from '../actions/burger';
import { TABS, BUN, DEFAULT_SELECTED_INGREDIENT_ID } from '../../models/constants';

const initialState = {
    ingredients: [],
    ingredientRequest: false,
    ingredientFailed: false,
    viewedIngredient: null,
    activeTab: TABS[0].type,
    modalVisible: false,
    selectedIngredients: [],
    selectedBun: null
}

export const burgerReducer = (state = initialState, action:any) => {
    switch(action.type){
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state, ingredientRequest:true
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state, 
                ingredientFailed: false, 
                ingredientRequest: false, 
                ingredients: action.ingredients.map((item:any) => { 
                    return item._id === DEFAULT_SELECTED_INGREDIENT_ID ? {...item, qty: 2} : {...item, qty: 0}}),
                selectedBun: action.ingredients.filter((item:any) => item._id === DEFAULT_SELECTED_INGREDIENT_ID)[0]
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
                                state.selectedIngredients.concat(action.selectedIngredient),
                ingredients: [...state.ingredients].map((item:any) => {
                    // увеличить счетчик на 1 для выбранного ингредиента и на 2 для булок
                    if (item._id === action.selectedIngredient._id)
                        return {...item, qty: isBun ? (item.qty+2) : ++item.qty};
                    // сбросить счетчик на предыдущей булке
                    else if (isBun && state.selectedBun !== null && item._id === (state.selectedBun as any)._id)
                        return {...item, qty: 0}
                    return item;
                })           
            }
        }
        case REMOVE_INGREDIENT: {
            if (action.removedIngredient.type === BUN)
                return {...state};
            return{
                ...state,
                selectedIngredients: [...state.selectedIngredients]
                            .filter((item:any, index:number) => index !== action.index),
                ingredients: [...state.ingredients].map((item:any) => item._id === action.removedIngredient._id ? {...item, qty: --item.qty} : item)
            }
        }
        case MOVE_INGREDIENT: {
            const upwardDrag = action.dragIndex > action.hoverIndex;
            const draggableIngredient = state.selectedIngredients[action.dragIndex];
            const hoveredIngredient = state.selectedIngredients[action.hoverIndex];

            return {...state, selectedIngredients: upwardDrag ? 
                [...state.selectedIngredients.slice(0, action.hoverIndex), 
                    draggableIngredient, hoveredIngredient, 
                    ...state.selectedIngredients.slice(action.dragIndex+1)] :
                [...state.selectedIngredients.slice(0, action.dragIndex), 
                    hoveredIngredient, draggableIngredient, 
                    ...state.selectedIngredients.slice(action.hoverIndex+1)]
            };
        }
        default: {
            return state;
        }
    }
}