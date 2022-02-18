import React, { ChangeEvent, SyntheticEvent, useEffect, FC } from 'react';
import styles from './page.module.css';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from 'react-router-dom';
import { ROUTES } from '../models/constants';
import { useDispatch, useSelector } from '../services/types/hooks';
import ErrorMessage from '../components/shared/error-message';
import { forgotPasswordSetEmail, resetPasswordRequest } from '../services/actions/auth';

export const ForgotPasswordPage: FC = () => {
    const { email, forgotPasswordRequestSuccess, forgotPasswordRequestFailed } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => { dispatch(forgotPasswordSetEmail('')) }, [dispatch]);

    const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => dispatch(forgotPasswordSetEmail(e.target.value));

    if (forgotPasswordRequestSuccess) {
        return (<Redirect to={{ pathname: ROUTES.ResetPassword.path }} />)
    }

    const formSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(resetPasswordRequest(email));
    }

    return (<section className={styles.container}>
        <section className={styles.formContainer}>
            <section className='text text_type_main-medium'>Восстановление пароля</section>
            <section>
                <form onSubmit={formSubmit}>
                    <div className="mt-6">
                        <Input name='email' value={email} type='email'
                            placeholder='Укажите e-mail'
                            onChange={onEmailChange} />
                    </div>
                    {forgotPasswordRequestFailed && <div className="mt-6"><ErrorMessage message='Произошла ошибка, попробуйте еще раз.' /></div>}
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