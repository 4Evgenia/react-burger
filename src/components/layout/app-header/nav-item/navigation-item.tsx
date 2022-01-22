import React from "react";
import styles from './navigation-item.module.css';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const NavigationItem = (props:any) => {
    return (
        <div className="pl-5">
            <NavLink to={props.path} activeClassName={styles.active} className={styles.inactive} exact={props.exact ?? false}>
                {props.children}
                <span className={`text text_type_main-default ${styles.navTitle} pl-2 pr-5`}>{props.text}</span>
            </NavLink>
        </div>
    );
}

NavigationItem.propTypes = {
    text: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
    path: PropTypes.string.isRequired,
    exact: PropTypes.bool
}

export default NavigationItem;
