import React from "react";
import './header.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import NavigationItem from "./nav-item/navigation-item";

export interface IHeaderState{
    activeItem: string;
}

const CONSTRUCTOR = "Конструктор";
const ORDERS = "Лента заказов";
const PROFILE = "Личный кабинет";

const Header = () => {
    const [activeItem, setActiveItem] = React.useState(CONSTRUCTOR);

    const onActiveItemChanged = (activeItem : string) => setActiveItem(activeItem);

    const isItemActive = (item: string):boolean => item === activeItem;

    return (<header className="header">
            <nav className="nav-bar">
                <div className="nav-container">
                    <NavigationItem text={CONSTRUCTOR} isActive={ isItemActive(CONSTRUCTOR) } onActiveItemChanged = { onActiveItemChanged } >
                        <BurgerIcon type={ isItemActive(CONSTRUCTOR) ? "primary" : "secondary" } />
                    </NavigationItem>

                    <NavigationItem text={ORDERS} isActive={ isItemActive(ORDERS) } onActiveItemChanged = { onActiveItemChanged } >
                        <ListIcon type={ isItemActive(ORDERS) ? "primary" : "secondary" } /> 
                    </NavigationItem>
                </div>
                
                <div className="logo nav-container"><Logo /></div>

                <div className="nav-container">
                <NavigationItem text={PROFILE} isActive={ isItemActive(PROFILE) } onActiveItemChanged = { onActiveItemChanged } >
                    <ProfileIcon type={ isItemActive(PROFILE) ? "primary" : "secondary" } /> 
                </NavigationItem>
                </div>                
            </nav>
        </header>);
}

export default Header;

