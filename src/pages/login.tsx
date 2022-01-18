import React from 'react';
import styles from './page.module.css';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import { ROUTES } from '../models/constants';
import { useDispatch, useSelector } from 'react-redux';


export const LoginPage = () => {
    const {email} = useSelector((state:any) => state.auth);
    const dispatch = useDispatch();
    
    return (
        <section className={styles.container}>
            <section className={styles.formContainer}>
                <header className='text text_type_main-medium'>Вход</header>
                <section>
                        <form>
                            <div className="mt-6">
                                <Input name='email' value='' type='email'
                                placeholder='E-mail'
                                onChange={() => alert('Hello')} />
                            </div>
                            <div className="mt-6">
                                <Input name='password' value='' type='password' 
                                placeholder='Пароль' icon='ShowIcon' 
                                onChange={() => alert('Hello')} />
                            </div>
                            <div className={`mt-6 ${styles.center}`}>
                                <div className={styles.buttonContainer}><Button type="primary" size="medium">Войти</Button></div>
                            </div>
                        </form>
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