import React, { ChangeEvent, SyntheticEvent, useState, FC } from 'react';
import styles from './page.module.css';
import { Input, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from 'react-router-dom';
import { ROUTES } from '../models/constants';
import { useDispatch, useSelector } from '../services/types/hooks';
import ErrorMessage from '../components/shared/error-message';
import { register } from '../services/actions/auth';
import { IUserWithPass } from '../models/models';

export const RegisterPage: FC = () => {
    const { registerSuccess,
        registerFailed } = useSelector(state => state.auth);

    const [state, setState] = useState<IUserWithPass>({
        email: '',
        name: '',
        password: ''
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setState({ ...state, [e.target.name]: e.target.value });
    const dispatch = useDispatch();

    const formSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(register(state.email, state.password, state.name));
    }

    if (registerSuccess) {
        return (<Redirect to={{ pathname: ROUTES.Login.path }} />)
    }

    return (<section className={styles.container}>
        <section className={styles.formContainer}>
            <section className='text text_type_main-medium'>Регистрация</section>
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
                        <PasswordInput name='password' value={state.password} onChange={handleInputChange} />
                    </div>
                    <div className={`mt-6 ${styles.center}`}>
                        <div className={styles.buttonContainer}><Button
                            disabled={!state.email || !state.password || !state.name}
                            type="primary" size="medium">Зарегистрироваться</Button></div>
                    </div>
                </form>
                {registerFailed && <div className="mt-6"><ErrorMessage message='Произошла ошибка, попробуйте еще раз.' /></div>}
                <div className={`mt-20 ${styles.center}`}>
                    <span className="text text_type_main-default text_color_inactive">Уже зарегистрированы? </span>
                    <Link to={ROUTES.Login.path}><span className="text text_type_main-default">Войти</span></Link>
                </div>
            </section>
        </section>
    </section>);
}