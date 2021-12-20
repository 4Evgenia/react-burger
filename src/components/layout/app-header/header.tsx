import React from "react";
import styles from './header.module.css';
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

    return (<header className={styles.header}>
            <nav className={styles.navBar}>
                <div className={styles.navContainer}>
                    <NavigationItem text={CONSTRUCTOR} isActive={ isItemActive(CONSTRUCTOR) } onActiveItemChanged = { onActiveItemChanged } >
                        <BurgerIcon type={ isItemActive(CONSTRUCTOR) ? "primary" : "secondary" } />
                    </NavigationItem>

                    <NavigationItem text={ORDERS} isActive={ isItemActive(ORDERS) } onActiveItemChanged = { onActiveItemChanged } >
                        <ListIcon type={ isItemActive(ORDERS) ? "primary" : "secondary" } /> 
                    </NavigationItem>
                </div>
                
                <div className={`${styles.logo} ${styles.navContainer} ${styles.navCenterContainer}`}><Logo /></div>

                <div className={`${styles.navContainer} ${styles.navEndContainer}`}>
                <NavigationItem text={PROFILE} isActive={ isItemActive(PROFILE) } onActiveItemChanged = { onActiveItemChanged } >
                    <ProfileIcon type={ isItemActive(PROFILE) ? "primary" : "secondary" } /> 
                </NavigationItem>
                </div>                
            </nav>
        </header>);
}

export default Header;

