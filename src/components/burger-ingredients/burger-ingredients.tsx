import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-ingredients.module.css';
import IngredientDetails from "./details/ingredient-details";
import IngredientItemsContainer from './ingredient-items-container/ingredient-items-container';
import Modal from "../layout/modal/modal";
import { TABS } from '../../models/constants';
import { Route } from 'react-router-dom';
import { getIngredients, 
    CHANGE_TAB, 
    SHOW_INGREDIENT_DETAILS, 
    HIDE_INGREDIENT_DETAILS} from '../../services/actions/burger';

const BurgerIngredients = () => {
    const dispatch = useDispatch();

    const {
        ingredients,
        viewedIngredient,
        activeTab,
        modalVisible
    } = useSelector((state:any) => state.burger);

    useEffect(() => {
        if (!ingredients.length) dispatch(getIngredients());
    }, [dispatch]);

    const onChangeActiveTab = (activeItem: string) => dispatch({type: CHANGE_TAB, selectedTab: activeItem});
    const burgerIngredient = useRef(null);

    const onSelectIngredient = (ingredient:any) => {
        dispatch({type: SHOW_INGREDIENT_DETAILS, selectedIngredient: ingredient});
    }

    const onCancelSelectIngredient = () => {
        dispatch({type: HIDE_INGREDIENT_DETAILS});
    }

    const calculateCoordinates = (element:HTMLElement) => {
        const parentY = document.getElementById("burger-ingredients")?.offsetTop ?? 0;
        const elementY = element.getBoundingClientRect().top;
        return Math.abs(parentY - elementY);
    } 

    const onScroll = (e:any) => {
        const headers = [...(document.getElementById("burger-ingredients")?.getElementsByTagName("h3") as any)];
        let minHeader = headers[0];
        let minHeaderCoordinates = calculateCoordinates(minHeader);
        
        for (let i = 1; i<headers.length; i++){
            const elementCoordinates = calculateCoordinates(headers[i]);
            if (minHeaderCoordinates > elementCoordinates){
                minHeader = headers[i];
                minHeaderCoordinates = elementCoordinates;
            }
        }
        if (activeTab !== minHeader.id)
            onChangeActiveTab(minHeader.id);
    }

    return (
        <section className={styles.container}>
            <div className="pl-5">
            <header className="mt-10">
                <h1 className="text text_type_main-large">Соберите бургер</h1>
            </header>
            <main className="mt-5 mb-10">
                <section className={styles.tabs}>
                    {TABS.map((tab:any) => (
                        <Tab value={tab.type} active={activeTab === tab.type} key={tab.type} onClick={onChangeActiveTab}>
                            {tab.displayName}
                        </Tab>
                    ))}
                </section>
                <section className="mt-10" ref={burgerIngredient} id="burger-ingredients">
                    <div className={styles.scroll} onScroll={onScroll}>
                        {ingredients && (<IngredientItemsContainer ingredients={ingredients} onSelectIngredient={onSelectIngredient} />)}
                    </div>
                </section>
            </main>
            </div>  
            {viewedIngredient && (
            <Modal visible = {modalVisible} title="Детали ингредиента" onCancel={onCancelSelectIngredient}>
                <IngredientDetails  ingredient={viewedIngredient} />
            </Modal>)}
        </section>
    );
}

export default BurgerIngredients;