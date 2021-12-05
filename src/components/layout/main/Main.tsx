import React from 'react';
import mainAreaStyles from './main.module.css';
import BurgerConstructor from '../../burger-constructor/burger-constructor';
import BurgerIngredient from '../../burger-ingredients/burger-ingredients';
import data from '../../../utils/data'
import Ingredient from '../../../models/ingredient';

interface AppState{
    ingredients: Array<Ingredient>,
    selectedIngredients: Array<Ingredient>
}

export default class Main extends React.Component<any, AppState>{
    constructor(props:any){
        super(props);
        this.state = {
            ingredients: [...data.map(item => 
                new Ingredient(item._id, item.name, item.type, 
                item.proteins, item.fat, item.carbohydrates, 
                item.calories, item.price, item.image, 
                item.image_mobile, item.image_large, 
                item.__v))],
            selectedIngredients: [...data.map(item => 
                new Ingredient(item._id, item.name, item.type, 
                item.proteins, item.fat, item.carbohydrates, 
                item.calories, item.price, item.image, 
                item.image_mobile, item.image_large, 
                item.__v))].slice(0, 5)
        }
    }
    render(){
        return (<main className={mainAreaStyles.main}>
            <BurgerConstructor ingredients = {this.state.ingredients} />
            <BurgerIngredient selectedIngredients = {this.state.selectedIngredients} />
        </main>)
    }
}