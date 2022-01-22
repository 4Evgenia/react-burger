import React from 'react';
import PropTypes from 'prop-types';
import styles from './successfull-message.module.css';
import { CheckMarkIcon  } from "@ya.praktikum/react-developer-burger-ui-components";

const Message = ({message}:any) => (
    <div className={`${styles.messageContainer} p-5 mb-10` }>
        <div className='pr-2'><CheckMarkIcon  type="success"/></div>
        <p className="text text_type_main-default">{message}</p>
    </div>
);

Message.propTypes = {
    message: PropTypes.string.isRequired
}

export default Message;