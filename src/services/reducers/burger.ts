import {
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    SHOW_INGREDIENT_DETAILS,
    HIDE_INGREDIENT_DETAILS,
    CHANGE_TAB,
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
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
                ingredients: action.ingredients,
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
            return action.selectedIngredient.type === BUN ?  {
                ...state,
                selectedBun: action.selectedIngredient
            } : 
            {
                ...state,
                selectedIngredients: [...state.selectedIngredients, action.selectedIngredient] 
            };
        }
        case REMOVE_INGREDIENT: {
            return{
                ...state,
                selectedIngredients: [...state.selectedIngredients].filter((item:any) => item.order !== action.order)
            }
        }
        default: {
            return state;
        }
    }
}