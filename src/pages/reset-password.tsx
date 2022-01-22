import React, { useState } from 'react';
import styles from './page.module.css';
import { Input, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from 'react-router-dom';
import { ROUTES } from '../models/constants';
import ErrorMessage from '../components/shared/error-message';
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordSubmit} from '../services/actions/auth';

export const ResetPasswordPage = () => {
    const {email, forgotPasswordSubmitFailed, forgotPasswordSubmitSuccess } = useSelector((state:any) => state.auth);
    const dispatch = useDispatch();

    const [state, setState] = useState({
        password: "",
        code: ""
    });

    const onFormChange = (e:any) => setState({
        ...state,
        [e.target.name]: e.target.value
    });

    const onResetPasswordSubmitted = (e:any) => {
        e.preventDefault();
        dispatch(resetPasswordSubmit(state.password, state.code));
    }

    if(!email){
        return (<Redirect to={{ pathname: ROUTES.ForgotPassword.path }}/>)
    }

    if (forgotPasswordSubmitSuccess){
        return (<Redirect to={{ pathname: ROUTES.Profile.path }}/>)
    }

    return (<section className={styles.container}>
        <section className={styles.formContainer}>
            <header className='text text_type_main-medium'>Восстановление пароля</header>
            <section>
                    <form>
                        <div className="mt-6">
                             <PasswordInput name='password' value={state.password} onChange={onFormChange} />
                        </div>
                        <div className="mt-6">
                            <Input name='code' value={state.code} type='text'
                            placeholder='Введите код из письма'
                            onChange={onFormChange} />
                        </div>
                        <div className={`mt-6 ${styles.center}`}>
                            <div className={styles.buttonContainer}><Button 
                            disabled={!state.password || !state.code} 
                            type="primary" 
                            size="medium"
                            onClick={onResetPasswordSubmitted}>Сохранить</Button></div>
                        </div>
                        { (forgotPasswordSubmitFailed) && <div className="mt-6"><ErrorMessage errorText='Произошла ошибка, попробуйте еще раз.' /></div> }
                    </form>
                    <div className={`mt-20 ${styles.center}`}>
                        <span className="text text_type_main-default text_color_inactive">Вспомнили пароль? </span>
                        <Link to={ROUTES.Login.path}><span className="text text_type_main-default">Войти</span></Link>
                    </div>
            </section>
        </section>
    </section>);
}