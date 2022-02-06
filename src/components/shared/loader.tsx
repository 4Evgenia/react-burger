import React, { FC } from 'react';
import styles from './loader.module.css';

type TLoaderProps = {
    text?: string;
}

const Loader: FC<TLoaderProps> = (props) => {
    return (
        <section className={`${styles.loaderContainer} mt-5`}>
            {props.text && <div className='text text_type_main-default'>{props.text}</div>}
            <div className={`${styles.ellipsisContainer} ${styles.loader}`}>
                <div className={`${styles.ellipsis} ${styles.first}`}></div>
                <div className={`${styles.ellipsis} ${styles.second}`}></div>
                <div className={`${styles.ellipsis} ${styles.third}`}></div>
                <div className={`${styles.ellipsis} ${styles.forth}`}></div>
            </div>
        </section>
    );
}

export default Loader;
