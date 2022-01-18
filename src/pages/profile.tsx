import React, { useState } from 'react';
import { Input, Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../components/shared/error-message';
import NavContainer from '../components/profile/nav-container';
import styles from './profile.module.css';


export const ProfilePage = () =>{
    const {user} = useSelector((state:any) => state.auth);
    const [disabled, setDisabled] = useState({ name: true, password: true });

    const handleInputChange = () => {}
    
    return (<section className={`${styles.container} pt-20`}>
        <NavContainer />
    <section className={styles.profile}>
                <div className="mt-6">
                    <Input name='name' value='{user.name}' type='text'
                    placeholder='Имя' icon="EditIcon" disabled={disabled.name}
                    onChange={handleInputChange} />
                </div>
                <div className="mt-6">
                    <EmailInput name='email' value='{user.email}' onChange={handleInputChange} />
                </div>
                <div className="mt-6">
                <Input name='password' type="password" value='' onChange={handleInputChange } icon="EditIcon" disabled={disabled.password}/>
                </div>
                <div className="mt-6"><ErrorMessage errorText='Произошла ошибка, попробуйте еще раз.' /></div>
            </section>
            </section>)
}