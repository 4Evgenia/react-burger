import React, { ChangeEvent, SyntheticEvent, useState, FC } from 'react';
import styles from './page.module.css';
import { Input, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useLocation } from 'react-router-dom';
import { ROUTES } from '../models/constants';
import { useDispatch, useSelector } from '../services/types/hooks';
import { login } from '../services/actions/auth';
import ErrorMessage from '../components/shared/error-message';
import { LocationState } from '../models/models';


export const LoginPage: FC = () => {
    const { user, loginFailed } = useSelector(state => state.auth);

    const dispatch = useDispatch();
    const location = useLocation<LocationState>();

    const [state, setState] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setState({ ...state, [e.target.name]: e.target.value });

    const formSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(login(state.email, state.password));
    }

    if (user) {
        const locationFrom = location.state?.from;
        const redirectUrl = locationFrom ? locationFrom.pathname : ROUTES.Home.path;
        return (
            <Redirect to={{ pathname: redirectUrl }} />)
    }

    return (
        <section className={styles.container}>
            <section className={styles.formContainer}>
                <section className='text text_type_main-medium'>Вход</section>
                <section>
                    <form onSubmit={formSubmit}>
                        <div className="mt-6">
                            <Input name='email' value={state.email} type='email'
                                placeholder='E-mail'
                                onChange={handleInputChange} />
                        </div>
                        <div className="mt-6">
                            <PasswordInput name='password' value={state.password} onChange={handleInputChange} />
                        </div>
                        <div className={`mt-6 ${styles.center}`}>
                            <div className={styles.buttonContainer}><Button disabled={!state.email || !state.password}
                                type="primary" size="medium">Войти</Button></div>
                        </div>
                    </form>
                    {loginFailed && <div className="mt-6"><ErrorMessage message='Произошла ошибка, попробуйте еще раз.' /></div>}
                    <div className={`mt-20 ${styles.center}`}>
                        <span className="text text_type_main-default text_color_inactive">Вы - новый пользователь? </span>
                        <Link to={ROUTES.Register.path}><span className="text text_type_main-default">Зарегистрироваться</span></Link>
                    </div>
                    <div className={`mt-6 ${styles.center}`}>
                        <span className="text text_type_main-default text_color_inactive">Забыли пароль? </span>
                        <Link to={ROUTES.ForgotPassword.path}><span className="text text_type_main-default">Восстановите пароль</span></Link>
                    </div>
                </section>
            </section>
        </section>
    );
}