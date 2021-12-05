import React from "react";
import './navigation-item.css';
import PropTypes from 'prop-types';

const NavigationItem = (props:any) => {
    const additionalClasses = props.className ?? '';
    return (
        <div className={`mr-2 nav-item-1 ${additionalClasses}`}>
                {props.children}
                <a href="#" className="text text_type_main-default nav-title pl-2 pr-5" onClick={() => props.onActiveItemChanged(props.text)}>
                    <span className={props.isActive ? 'active' : 'inactive'}>{props.text}</span>
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
