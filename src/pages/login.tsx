import React, { useState } from 'react';
import styles from './page.module.css';
import { Input, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from 'react-router-dom';
import { ROUTES } from '../models/constants';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../services/actions/auth';
import ErrorMessage from '../components/shared/error-message';


export const LoginPage = () => {
    const {user, loginFailed, loginSuccess} = useSelector((state:any) => state.auth);
    const dispatch = useDispatch();

    const [state, setState] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (e:any) => setState({...state, [e.target.name]: e.target.value});

    const formSubmit = (e:any) => {
        e.preventDefault();
        dispatch(login(state.email, state.password));
    }

    console.log(user);

    if(loginSuccess && user){
        return (<Redirect to={{ pathname: ROUTES.Home.path }}/>)
    }
    
    return (
        <section className={styles.container}>
            <section className={styles.formContainer}>
                <header className='text text_type_main-medium'>Вход</header>
                <section>
                        <form onSubmit= { formSubmit }>
                            <div className="mt-6">
                                <Input name='email' value={state.email} type='email'
                                placeholder='E-mail'
                                onChange={ handleInputChange } />
                            </div>
                            <div className="mt-6">
                                <PasswordInput name='password' value={state.password} onChange={ handleInputChange } />
                            </div>
                            <div className={`mt-6 ${styles.center}`}>
                                <div className={styles.buttonContainer}><Button disabled = { !state.email || !state.password } 
                                type="primary" size="medium">Войти</Button></div>
                            </div>
                        </form>
                        { loginFailed && <div className="mt-6"><ErrorMessage errorText='Произошла ошибка, попробуйте еще раз.' /></div> }
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