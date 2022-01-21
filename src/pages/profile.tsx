import React, { useState } from 'react';
import { Input, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../components/shared/error-message';
import NavContainer from '../components/profile/nav-container';
import styles from './profile.module.css';

type disabledField = {
    [key: string]: boolean
}

export const ProfilePage = () =>{
    const {user} = useSelector((state:any) => state.auth);
    const initialState = {name: user.name, email: user.email, password: ''};

    const [userForm, setUserForm] = useState(initialState);
    const [disabled, setDisabled] = useState({
        email: true,
        name: true,
        password: true
    } as disabledField)

    const handleInputChange = (e:any) => setUserForm({...userForm, [e.target.name]: e.target.value});
    const onIconClick = (field:string) => 
    {
        setUserForm({...userForm, [field]: user[field] ?? ''})
        setDisabled({...disabled, [field]: !disabled[field]})
    }

    const formChanged = ():boolean => user.name !== userForm.name || user.email !== userForm.email || userForm.password !== '';

    const onCancelClick = (e:any) => {
        e.preventDefault();
        setUserForm(initialState);
    }
    
    return (<section className={`${styles.container} pt-20`}>
        <NavContainer />
        <form>
            <section className={styles.profile}>
                    <div className="mt-6">
                        <Input name='name' disabled={disabled.name} onIconClick={() => {onIconClick('name')}}
                        value={userForm.name} type='text'
                        placeholder='Имя' icon={disabled.name ? "EditIcon": "CloseIcon"}
                        onChange={handleInputChange} />
                    </div>
                    <div className="mt-6">
                        <Input name='email' disabled={disabled.email}  
                        value={userForm.email} 
                        placeholder='E-mail' 
                        icon={disabled.email ? "EditIcon": "CloseIcon"}
                        onChange={handleInputChange} 
                        onIconClick={() => {onIconClick('email')}} />
                    </div>
                    <div className="mt-6">
                        <Input name="password" 
                        disabled={disabled.password} 
                        value={userForm.password} 
                        placeholder='Пароль'
                        icon={disabled.password ? "EditIcon": "CloseIcon"} 
                        onChange={handleInputChange} 
                        onIconClick={() => {onIconClick('password')}} />
                    </div>
                    {formChanged() && (<div className={`mt-6 ${styles.center}`}>
                                <div className={styles.buttonContainer}>
                                    <div className='mr-10'><Button type="primary" size="medium">Сохранить</Button></div>
                                    <div><Button type="secondary" size="medium" onClick={onCancelClick}>Отмена</Button></div>
                                </div>
                            </div>)}
                    <div className="mt-6"><ErrorMessage errorText='Произошла ошибка, попробуйте еще раз.' /></div>
                </section>
        </form>
        </section>)
}