import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from './burger-constructor.module.css';
import ConstructorItems from './constructor-items/constructor-items';
import  Ingredient from '../../models/ingredient';

interface TabItem{
    displayName: string,
    type: string,
}

export interface IBurgerConstructorState{
    tabs: Array<TabItem>,
    currentActiveTab: string
}

export interface IBurgerConstructorProps{
    ingredients: Array<Ingredient>
}

export default class BurgerConstructor extends React.Component<IBurgerConstructorProps, IBurgerConstructorState>{
    constructor (props: any){
        super(props);
        this.state = this.initialState;
    }

    setCurrent = (activeItem: string) => this.setState({...this.state, currentActiveTab: activeItem});


    render(){
        return (
            <section className={burgerConstructorStyles.container}>
                <div className="pl-5">
                <header className="mt-10">
                    <h1 className="text text_type_main-large">Соберите бургер</h1>
                </header>
                <main className="mt-5 mb-10">
                    <section className={burgerConstructorStyles.tabs}>
                        {this.state.tabs.map(tab => (
                            <Tab value={tab.type} active={this.state.currentActiveTab === tab.type} key={tab.type} onClick={this.setCurrent}>
                                {tab.displayName}
                            </Tab>
                        ))}
                    </section>
                    <section className="mt-10">
                        <div className={burgerConstructorStyles.scroll}>
                            {this.state.tabs.map(tab => (<ConstructorItems title={tab.displayName} key={tab.type}
                                data = { [ ...this.props.ingredients.filter(i => i.type === tab.type) ] } />))}
                        </div>
                    </section>
                </main>
                </div>
            </section>
        );
    }

    private initialState = {
         tabs: [
             {displayName: 'Булки', type: 'bun'}, 
             {displayName: 'Соусы', type: 'sauce'}, 
             {displayName: 'Начинки', type: 'main'}], 
        currentActiveTab: 'bun'
    };
}