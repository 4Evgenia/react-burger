import React, { FC} from 'react';
import styles from './page.module.css';

export const NotFoundPage:FC = () => {
    return (<section className={styles.container}>
        <section className={styles.formContainer}>
            <header>
                <h2 className="text text_type_main-medium">Упс, запрошенная Вами страница не найдена</h2>
            </header>
            <main className='mt-20'>
                <span className="text text_type_main-default text_color_inactive">
                    Пожалуйста воспользуйтесь ссылками на навигационной панели.
                </span>
            </main>
        </section>
    </section>);
}