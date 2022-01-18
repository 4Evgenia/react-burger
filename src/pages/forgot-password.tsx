import React, {useEffect, useState} from 'react';
import styles from './page.module.css';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from 'react-router-dom';
import { ROUTES } from '../models/constants';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../components/shared/error-message';
import { FORGOT_PASSWORD_SET_EMAIL } from '../services/actions/auth';
import { passwordReset } from '../utils/api';

export const ForgotPasswordPage = () => {
    const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(false);
    const [forgotPasswordFailed, setForgotPasswordFailed] = useState(false);
    const {email} = useSelector((state:any) => state.auth);
    const dispatch = useDispatch();
    
    useEffect(() => { dispatch({type: FORGOT_PASSWORD_SET_EMAIL, email: ''}) }, [dispatch]);

    const onEmailChange = (e:any) => dispatch({type: FORGOT_PASSWORD_SET_EMAIL, email: e.target.value});
    
    if (forgotPasswordSuccess){
        return (<Redirect to={{ pathname: ROUTES.ResetPassword.path }}/>)
    }

    const formSubmit = (e:any) => {
        e.preventDefault();
        passwordReset(email).then(res => {
            if (res && res.success){
                setForgotPasswordSuccess(true);
            }else{
                setForgotPasswordFailed(true);
            }
        }).catch(e => setForgotPasswordFailed(true));
    }

    return (<section className={styles.container}>
        <section className={styles.formContainer}>
            <header className='text text_type_main-medium'>Восстановление пароля</header>
            <section>
                    <form onSubmit={formSubmit}>
                        <div className="mt-6">
                            <Input name='email' value={email} type='email'
                            placeholder='Укажите e-mail'
                            onChange={onEmailChange} />
                        </div>
                        { forgotPasswordFailed && <ErrorMessage errorText='Произошла ошибка, попробуйте еще раз.' /> }
                        <div className={`mt-6 ${styles.center}`}>
                            <div className={styles.buttonContainer}>
                                <Button 
                                    disabled={!email} type="primary" 
                                    size="medium">Восстановить</Button></div>
                        </div>
                    </form>
                    <div className={`mt-20 ${styles.center}`}>
                        <span className="text text_type_main-default text_color_inactive">Вспомнили пароль? </span>
                        <Link to={ROUTES.Login.path}><span className="text text_type_main-default">Войти</span></Link>
                    </div>
            </section>
        </section>
    </section>);
}