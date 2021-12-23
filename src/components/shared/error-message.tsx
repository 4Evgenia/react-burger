import React from 'react';
import PropTypes from 'prop-types';
import styles from './error-message.module.css';
import { InfoIcon  } from "@ya.praktikum/react-developer-burger-ui-components";

const ErrorMessage = ({errorText}:any) => (
    <div className={`${styles.errorContainer} p-5 mb-10` }>
        <div className='pr-2'><InfoIcon  type="error"/></div>
        <p className="text text_type_main-default">{errorText}</p>
    </div>
);

ErrorMessage.propTypes = {
    errorText: PropTypes.string.isRequired
}

export default ErrorMessage;