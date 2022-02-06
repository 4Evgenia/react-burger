import React, { FC } from 'react';
import NavContainer from '../components/profile/nav-container';
import styles from './profile.module.css';

export const OrderHistoryPage: FC = () => {
    return (<section className={`${styles.container} pt-20`}>
        <NavContainer />
        <section className={styles.profile}>
            ORDERS HISTORY PAGE
        </section>
    </section>)
}