import React, { useState } from 'react';
import styles from './page.module.css';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from 'react-router-dom';
import { ROUTES } from '../models/constants';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../components/shared/error-message';
import { register } from '../services/actions/auth';

export const RegisterPage = () => {
    const {user, 
           registerRequest,
           registerSuccess,
           registerFailed} = useSelector((state:any) => state.auth);
    
     const [state, setState] = useState({
        email: '',
        name: '',
        password: ''
    });

    const handleInputChange = (e:any) => setState({...state, [e.target.name]: e.target.value});
    const dispatch = useDispatch();

    const formSubmit = (e:any) => {
        e.preventDefault();
        dispatch(register(state.email, state.password, state.name));
    }

    if(user){
        return (<Redirect to={{ pathname: ROUTES.Home.path }}/>)
    }

    return (<section className={styles.container}>
        <section className={styles.formContainer}>
            <header className='text text_type_main-medium'>Регистрация</header>
            <section>
                    <form onSubmit={formSubmit}>
                        <div className="mt-6">
                            <Input name='name' value={state.name} type='text'
                            placeholder='Имя'
                            onChange={handleInputChange} />
                        </div>
                        <div className="mt-6">
                            <Input name='email' value={state.email} type='email'
                            placeholder='E-mail'
                            onChange={handleInputChange} />
                        </div>
                        <div className="mt-6">
                            <Input name='password' value={state.password} type='password' 
                            placeholder='Пароль' icon='ShowIcon' 
                            onChange={handleInputChange} />
                        </div>
                        <div className={`mt-6 ${styles.center}`}>
                            <div className={styles.buttonContainer}><Button
                            disabled = {!state.email || !state.password || !state.name } 
                            type="primary" size="medium">Зарегистрироваться</Button></div>
                        </div>
                    </form>
                    { registerFailed && <div className="mt-6"><ErrorMessage errorText='Произошла ошибка, попробуйте еще раз.' /></div> }
                    <div className={`mt-20 ${styles.center}`}>
                        <span className="text text_type_main-default text_color_inactive">Уже зарегистрированы? </span>
                        <Link to={ROUTES.Login.path}><span className="text text_type_main-default">Войти</span></Link>
                    </div>
            </section>
        </section>
    </section>);
}