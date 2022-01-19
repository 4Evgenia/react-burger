import React, { useState } from 'react';
import styles from './nav-container.module.css';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { ROUTES } from '../../models/constants';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../shared/error-message';
import { logout } from '../../services/actions/auth';

export const NavContainer = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {logoutSuccess} = useSelector((state:any) => state.auth);

    const signOut = () => {
        dispatch(logout());
        if (logoutSuccess){
            history.replace({ pathname: ROUTES.Home.path });
        }
    } 
        

    return (
        <section>
            <nav className={`mt-6 ${styles.nav} mr-15`}>
                <div className="mb-5 mt-5"><NavLink to={ROUTES.Profile.path} activeClassName={styles.active} className={styles.inactive} exact={true}>
                    <span className={`text text_type_main-medium`}>Профиль</span>
                </NavLink></div>
                <div className="mb-5"><NavLink to={ROUTES.History.path} activeClassName={styles.active} className={styles.inactive} exact={false}>
                    <span className={`text text_type_main-medium`}>История заказов</span>
                </NavLink></div>
                <div className={`mb-5 ${styles.logout}`} onClick={signOut}>
                    <span className={`text text_type_main-medium text_color_inactive`}>Выход</span>
                </div>
            </nav>
        </section>);
}

export default NavContainer;