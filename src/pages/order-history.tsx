import React, { useState } from 'react';
import { Input, Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../components/shared/error-message';
import NavContainer from '../components/profile/nav-container';
import styles from './profile.module.css';

export const OrderHistoryPage = () =>{
    const {user} = useSelector((state:any) => state.auth);

    const handleInputChange = () => {}
    
    return (<section className={`${styles.container} pt-20`}>
        <NavContainer />
    <section className={styles.profile}>
    ORDERS HISTORY PAGE
            </section>
            </section>)
}