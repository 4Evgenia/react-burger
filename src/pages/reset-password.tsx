import React, { useState } from 'react';
import styles from './page.module.css';
import { Input, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import { ROUTES } from '../models/constants';
import ErrorMessage from '../components/shared/error-message';
import { passwordResetSubmit } from '../utils/api';

export const ResetPasswordPage = () => {
    const [state, setState] = useState({
        password: "",
        code: ""
    });

    const [resetPasswordFailed, setResetPasswordFailed] = useState(false);

    const onFormChange = (e:any) => setState({
        ...state,
        [e.target.name]: e.target.value
    });

    const onResetPasswordSubmitted = () => {
        passwordResetSubmit(state.password)
            .then(res => {
                if (res && res.success){

                } else{
                    setResetPasswordFailed(true);
                }
            })
            .catch(e => setResetPasswordFailed(true));
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
                            size="medium">Сохранить</Button></div>
                        </div>
                        { resetPasswordFailed && <ErrorMessage errorText='Произошла ошибка, попробуйте еще раз.' /> }
                    </form>
                    <div className={`mt-20 ${styles.center}`}>
                        <span className="text text_type_main-default text_color_inactive">Вспомнили пароль? </span>
                        <Link to={ROUTES.Login.path}><span className="text text_type_main-default">Войти</span></Link>
                    </div>
            </section>
        </section>
    </section>);
}