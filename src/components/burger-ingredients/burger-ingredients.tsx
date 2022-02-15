import React, { useRef } from "react";
import { useDispatch, useSelector } from '../../services/types/hooks';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-ingredients.module.css';
import IngredientItemsContainer from './ingredient-items-container/ingredient-items-container';
import { TABS } from '../../models/constants';
import {
    changeTab,
    showIngredientDetails
} from '../../services/actions/burger';
import { IIngredient, TTab } from "../../models/models";

const BurgerIngredients = () => {
    const dispatch = useDispatch();

    const {
        ingredients,
        activeTab
    } = useSelector(state => state.burger);

    const onChangeActiveTab = (activeItem: string) => dispatch(changeTab(activeItem));
    const burgerIngredient = useRef<HTMLDivElement>(null);

    const onSelectIngredient = (ingredient: IIngredient) => {
        dispatch(showIngredientDetails(ingredient));
    }

    const calculateCoordinates = (element: HTMLElement) => {
        const parentY = document.getElementById("burger-ingredients")?.offsetTop ?? 0;
        const elementY = element.getBoundingClientRect().top;
        return Math.abs(parentY - elementY);
    }

    const onScroll = () => {
        const headerElements = document.getElementById("burger-ingredients")?.getElementsByTagName("h3");
        if (!headerElements) {
            return;
        }
        const headers = Array.from(headerElements);
        let minHeader = headers[0];
        let minHeaderCoordinates = calculateCoordinates(minHeader);

        for (let i = 1; i < headers.length; i++) {
            const elementCoordinates = calculateCoordinates(headers[i]);
            if (minHeaderCoordinates > elementCoordinates) {
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
                <section className="mt-10">
                    <h1 className="text text_type_main-large">Соберите бургер</h1>
                </section>
                <main className="mt-5 mb-10">
                    <section className={styles.tabs}>
                        {TABS.map((tab: TTab) => (
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
        </section>
    );
}

export default BurgerIngredients;