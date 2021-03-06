import React, { ChangeEvent, SyntheticEvent, useState, useEffect, FC } from 'react';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from '../services/types/hooks';
import ErrorMessage from '../components/shared/error-message';
import Message from '../components/shared/successfull-message';
import NavContainer from '../components/profile/nav-container';
import styles from './profile.module.css';
import { setUser } from '../services/actions/auth';
import { IUser } from '../models/models';

type TDisabledField = {
    [key: string]: boolean
}

type TField = keyof IUser;

export const ProfilePage: FC = () => {
    const { user, setUserFailed, setUserSuccess } = useSelector(state => state.auth);
    const initialState: IUser = { name: user?.name ?? '', email: user?.email ?? '', password: '' };
    const initialDisabledState: TDisabledField = {
        email: true,
        name: true,
        password: true
    };
    const dispatch = useDispatch();

    const [userForm, setUserForm] = useState<IUser>(initialState);
    const [disabled, setDisabled] = useState<TDisabledField>(initialDisabledState);

    useEffect(() => {
        if (setUserSuccess) {
            setUserForm(initialState);
            setDisabled(initialDisabledState);
        }
    }, [setUserSuccess]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setUserForm({ ...userForm, [e.target.name]: e.target.value });
    const onIconClick = (field: TField) => {
        if (user != null){
            setUserForm({ ...userForm, [field]: user[field] ?? '' })
            setDisabled({ ...disabled, [field]: !disabled[field] })
        }
    }

    const formChanged = (): boolean => user?.name !== userForm.name || user?.email !== userForm.email || userForm.password !== '';

    const onCancelClick = (e: SyntheticEvent) => {
        e.preventDefault();
        setUserForm(initialState);
    }

    const onFormSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(setUser(userForm));
    }

    return (<section className={`${styles.container} pt-20`}>
        <NavContainer />
        <form onSubmit={onFormSubmit}>
            <section className={styles.profile}>
                <div className="mt-6">
                    <Input name='name' disabled={disabled.name} onIconClick={() => { onIconClick('name') }}
                        value={userForm.name} type='text'
                        placeholder='??????' icon={disabled.name ? "EditIcon" : "CloseIcon"}
                        onChange={handleInputChange} />
                </div>
                <div className="mt-6">
                    <Input name='email' disabled={disabled.email} type="email"
                        value={userForm.email}
                        placeholder='E-mail'
                        icon={disabled.email ? "EditIcon" : "CloseIcon"}
                        onChange={handleInputChange}
                        onIconClick={() => { onIconClick('email') }} />
                </div>
                <div className="mt-6">
                    <Input name="password" type="password"
                        disabled={disabled.password}
                        value={userForm.password ?? ''}
                        placeholder='????????????'
                        icon={disabled.password ? "EditIcon" : "CloseIcon"}
                        onChange={handleInputChange}
                        onIconClick={() => { onIconClick('password') }} />
                </div>
                {formChanged() && (<div className={`mt-6 ${styles.center}`}>
                    <div className={styles.buttonContainer}>
                        <div className='mr-10'><Button type="primary" size="medium">??????????????????</Button></div>
                        <div><Button type="secondary" size="medium" onClick={onCancelClick}>????????????</Button></div>
                    </div>
                </div>)}
                {setUserFailed && <div className="mt-6"><ErrorMessage message='?????????????????? ????????????, ???????????????????? ?????? ??????.' /></div>}
                {setUserSuccess && <div className="mt-6"><Message message='???????????????????? ?????????????????? ??????????????' /></div>}
            </section>
        </form>
    </section>)
}