import React, { FC } from 'react';
import styles from './status.module.css';
import { DONE_STATUS, PENDING_STATUS, CREATED_STATUS } from '../../models/constants';

type TStatusProps = {
    status: string;
}

const Status: FC<TStatusProps> = (props) => {
    const statusName = props.status === DONE_STATUS ? "Выполнен" : "Готовится";
    return (
        <section className='text text_type_main-small'>
            <div className={props.status === DONE_STATUS ? styles.done : styles.notDone}>
                {statusName}
            </div>
        </section>
    );
}

export default Status;