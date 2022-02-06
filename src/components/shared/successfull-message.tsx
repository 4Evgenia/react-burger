import React, { useState, FC } from 'react';
import styles from './successfull-message.module.css';
import { CheckMarkIcon, CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TMessage } from '../../models/models';

const Message: FC<TMessage> = ({ message }) => {
    const [show, setShow] = useState(true);

    if (!show)
        return null;

    return (
        <div className={`${styles.messageContainer} pt-5 pb-10 pl-5 pr-5`}>
            <div className={styles.header}>
                <div className={styles.icon}><CloseIcon onClick={() => setShow(false)} type="primary" /></div>
            </div>
            <div className={`${styles.infoContainer} mr-15`}>
                <div className='pr-2'><CheckMarkIcon type="success" /></div>
                <p className="text text_type_main-default">{message}</p>
            </div>
        </div>
    )
};

export default Message;