import React, { FC } from "react";
import styles from './header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import NavigationItem from "./nav-item/navigation-item";
import { useLocation, Link } from 'react-router-dom';
import { ROUTES } from '../../../models/constants';
import { Location } from 'history';


const Header: FC = () => {
    const { pathname } = useLocation<Location>();

    return (<header className={styles.header}>
        <nav className={styles.navBar}>
            <div className={styles.navContainer}>
                <NavigationItem text={ROUTES.Home.title} path={ROUTES.Home.path} exact={true}>
                    <BurgerIcon type={pathname === ROUTES.Home.path ? "primary" : "secondary"} />
                </NavigationItem>

                <NavigationItem text={ROUTES.Feed.title} path={ROUTES.Feed.path} >
                    <ListIcon type={pathname.indexOf(ROUTES.Feed.path) >= 0 ? "primary" : "secondary"} />
                </NavigationItem>
            </div>

            <div className={`${styles.logo} ${styles.navContainer} ${styles.navCenterContainer}`}>
                <Link to={ROUTES.Home.path}><Logo /></Link>
            </div>

            <div className={`${styles.navContainer} ${styles.navEndContainer}`}>
                <NavigationItem text={ROUTES.Profile.title} path={ROUTES.Profile.path}>
                    <ProfileIcon type={pathname.indexOf(ROUTES.Profile.path) >= 0 ? "primary" : "secondary"} />
                </NavigationItem>
            </div>
        </nav>
    </header>);
}

export default Header;

