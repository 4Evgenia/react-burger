import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from './burger-constructor.module.css';
import ConstructorItems from './constructor-items/constructor-items';
import PropTypes from 'prop-types';
import {ingredientPropType} from '../utils/prop-type';
import IngredientDetails from "./details/ingredient-details";


const BurgerConstructor = (props: any) => {
    const [activeTab, setActiveTab] = React.useState(() => props.tabs[0].type);
    const [detailsVisible, setDetailsVisible] = React.useState(false);
    const [selectedIngredient, setSelectedIngredient] = React.useState({} as any);

    const onChangeActiveTab = (activeItem: string) => setActiveTab(activeItem);

    const onSelectIngredient = (ingredient:any) => {
        setSelectedIngredient(ingredient);
        setDetailsVisible(true);
    }

    const onCancelSelectIngredient = () => {
        setDetailsVisible(false);
        setSelectedIngredient({} as any);
    }

    return (
        <section className={burgerConstructorStyles.container}>
            <div className="pl-5">
            <header className="mt-10">
                <h1 className="text text_type_main-large">Соберите бургер</h1>
            </header>
            <main className="mt-5 mb-10">
                <section className={burgerConstructorStyles.tabs}>
                    {props.tabs.map((tab:any) => (
                        <Tab value={tab.type} active={activeTab === tab.type} key={tab.type} onClick={onChangeActiveTab}>
                            {tab.displayName}
                        </Tab>
                    ))}
                </section>
                <section className="mt-10">
                    <div className={burgerConstructorStyles.scroll}>
                        {props.tabs.map((tab:any) => (<ConstructorItems 
                            title={tab.displayName} 
                            key={tab.type}
                            data = { [ ...props.ingredients.filter((i:any) => i.type === tab.type) ] }
                            onSelectIngredient = {onSelectIngredient} 
                            />))}
                    </div>
                </section>
            </main>
            </div>
            {detailsVisible && (<IngredientDetails ingredient={selectedIngredient} visible={detailsVisible} onCancel={onCancelSelectIngredient} />)}
        </section>
    );
}

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
    tabs: PropTypes.arrayOf(PropTypes.shape({
        displayName: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
    })).isRequired
}

export default BurgerConstructor;