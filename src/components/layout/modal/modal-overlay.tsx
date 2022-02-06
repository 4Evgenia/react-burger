import React, { FC } from 'react';
import styles from './modal.module.css';

type TModalOverLayProps = {
    onClick?: () => void;
}

const ModalOverlay: FC<TModalOverLayProps> = (props) => <div className={styles.backdrop} onClick={props.onClick}></div>;

export default ModalOverlay;

