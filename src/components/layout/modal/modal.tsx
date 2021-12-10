import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from './modal-overlay';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById("react-modals");

const Modal = (props: any) => {
    
    const onEscapeClick = (event:any) => {
        if (event.keyCode === 27)
            props.onCancel();
    }

    React.useEffect(() => {
        document.addEventListener("keydown", onEscapeClick);

        return () => document.removeEventListener("keydown", onEscapeClick);
    }, [])
    
    const modal = (<>
            <ModalOverlay onClick={props.onCancel} />
            <section className={styles.modal}>
                <div className="m-10">
                    <header>
                        <div className={styles.header}>
                            <h1 className={styles.title}><span className="text text_type_main-large">{props.title}</span></h1>
                            <div className={styles.iconContainer}>
                                <div className={styles.icon} onClick={props.onCancel}>
                                    <CloseIcon type="primary" />
                                </div>
                            </div>
                        </div>
                    </header>
                    <main className={styles.main}>
                        {props.children}
                    </main>
            </div>
        </section></>);
    return ReactDOM.createPortal((<>{props.visible && modal}</>), modalRoot as Element);
}

Modal.propTypes = {
    title: PropTypes.string,
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired
}

export default Modal;