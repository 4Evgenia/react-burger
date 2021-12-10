import React from 'react';
import styles from './modal.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = (props:any) => <div className={styles.backdrop} onClick={props.onClick}></div>;

ModalOverlay.propTypes = {
    onClick: PropTypes.func
}

export default ModalOverlay;

