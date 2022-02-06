import React from 'react';
import styles from './nav-container.module.css';
import { NavLink, useHistory } from 'react-router-dom';
import { ROUTES } from '../../models/constants';
import { useDispatch } from 'react-redux';
import { logout } from '../../services/actions/auth';

export const NavContainer = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const signOut = () => {
        dispatch(logout());
        history.replace({ pathname: ROUTES.Home.path });
    }


    return (
        <section className={styles.navContainer}>
            <div className={styles.empty}></div>
            <nav className={`mt-6 ${styles.nav} mr-15`}>
                <div className="mb-5 mt-5"><NavLink to={ROUTES.Profile.path} activeClassName={styles.active} className={styles.inactive} exact={true}>
                    <span className={`text text_type_main-medium`}>Профиль</span>
                </NavLink></div>
                <div className="mb-5"><NavLink to={ROUTES.History.path} activeClassName={styles.active} className={styles.inactive} exact={false}>
                    <span className={`text text_type_main-medium`}>История заказов</span>
                </NavLink></div>
                <div className={`mb-20 ${styles.logout}`} onClick={signOut}>
                    <span className={`text text_type_main-medium text_color_inactive`}>Выход</span>
                </div>
                <div>
                    <span className={`text text_type_main-default text_color_inactive`}>В этом разделе вы можете изменить свои персональные данные</span>
                </div>
            </nav>
        </section>);
}

export default NavContainer;