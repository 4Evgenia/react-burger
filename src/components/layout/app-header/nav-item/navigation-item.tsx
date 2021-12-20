import React from "react";
import styles from './navigation-item.module.css';
import PropTypes from 'prop-types';

const NavigationItem = (props:any) => {
    return (
        <div className="pl-5">
                {props.children}
                <a href="#" className={`text text_type_main-default ${styles.navTitle} pl-2 pr-5`} onClick={() => props.onActiveItemChanged(props.text)}>
                    <span className={props.isActive ? styles.active : styles.inactive}>{props.text}</span>
                </a>
        </div>
    );
}

NavigationItem.propTypes = {
    text: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    children: PropTypes.element.isRequired,
    className: PropTypes.string,
    onActiveItemChanged: PropTypes.func
}

export default NavigationItem;
