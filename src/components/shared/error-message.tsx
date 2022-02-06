import React, { FC } from 'react';
import styles from './error-message.module.css';
import { InfoIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TMessage } from '../../models/models';

const ErrorMessage: FC<TMessage> = ({ message }) => (
    <div className={`${styles.errorContainer} p-5 mb-10`}>
        <div className='pr-2'><InfoIcon type="error" /></div>
        <p className="text text_type_main-default">{message}</p>
    </div>
);

export default ErrorMessage;