import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './successfull-message.module.css';
import { CheckMarkIcon, CloseIcon  } from "@ya.praktikum/react-developer-burger-ui-components";

const Message = ({message}:any) => {
    const [show, setShow] = useState(true);

    if(!show)
        return null;

    return (
    <div className={`${styles.messageContainer} pt-5 pb-10 pl-5 pr-5` }>
        <header className={styles.header}>
            <div className={styles.icon}><CloseIcon onClick={ () => setShow(false) } type="primary"/></div>
        </header>
        <div className={`${styles.infoContainer} mr-15`}>
            <div className='pr-2'><CheckMarkIcon  type="success"/></div>
            <p className="text text_type_main-default">{message}</p>
        </div>
    </div>
)};

Message.propTypes = {
    message: PropTypes.string.isRequired
}

export default Message;