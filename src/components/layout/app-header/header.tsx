import React from "react";
import styles from './header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import NavigationItem from "./nav-item/navigation-item";
import { useLocation } from 'react-router-dom';
import { ROUTES } from '../../../models/constants';

export interface IHeaderState{
    activeItem: string;
}

const Header = () => {
    const { pathname } = useLocation();

    return (<header className={styles.header}>
            <nav className={styles.navBar}>
                <div className={styles.navContainer}>
                    <NavigationItem text={ROUTES.Home.title} path={ROUTES.Home.path} exact={true}>
                        <BurgerIcon type={ pathname === ROUTES.Home.path ? "primary" : "secondary" } />
                    </NavigationItem>

                    <NavigationItem text={ROUTES.Orders.title} path={ROUTES.Orders.path} >
                        <ListIcon type={ pathname === ROUTES.Orders.path ? "primary" : "secondary" } /> 
                    </NavigationItem>
                </div>
                
                <div className={`${styles.logo} ${styles.navContainer} ${styles.navCenterContainer}`}><Logo /></div>

                <div className={`${styles.navContainer} ${styles.navEndContainer}`}>
                <NavigationItem text={ROUTES.Profile.title} path={ROUTES.Profile.path}>
                    <ProfileIcon type={ pathname.indexOf(ROUTES.Profile.path) >=0 ? "primary" : "secondary" } /> 
                </NavigationItem>
                </div>                
            </nav>
        </header>);
}

export default Header;

