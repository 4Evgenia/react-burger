import React, { ReactNode, FC } from "react";
import styles from './navigation-item.module.css';
import { NavLink } from 'react-router-dom';

type TNavItemProps = {
    text: string;
    children: ReactNode,
    path: string,
    exact?: boolean
}

const NavigationItem:FC<TNavItemProps> = (props) => {
    return (
        <div className="pl-5">
            <NavLink to={props.path} activeClassName={styles.active} className={styles.inactive} exact={props.exact ?? false}>
                {props.children}
                <span className={`text text_type_main-default ${styles.navTitle} pl-2 pr-5`}>{props.text}</span>
            </NavLink>
        </div>
    );
}

export default NavigationItem;
