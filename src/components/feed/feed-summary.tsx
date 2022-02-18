import React, { FC } from "react";
import { IFeedSummary } from "../../models/models";
import styles from './feed-summary.module.css';
import ColumnSeparator from '../shared/column-separator';

export type IFeedSummaryProps = {
    summary: IFeedSummary
};

const FeedSummary: FC<IFeedSummaryProps> = ({ summary }) => {
    return (
        <section className={`${styles.container} ml-15 mt-25 pr-5`}>
            <section className={styles.workSummary}>
                <div className={`${styles.doneContainer} mr-9`}>
                    <section className="text text_type_main-medium mb-6">
                        Готовы
                    </section>
                    <ColumnSeparator arr={summary.done} isDone={true} />
                </div>
                <div className={styles.inProgressContainer}>
                    <section className="text text_type_main-medium mb-6">
                        В работе
                    </section>
                    <ColumnSeparator arr={summary.inProgress} />
                </div>
            </section>
            <div className="mt-15">
                <section className="text text_type_main-medium">
                    Выполнено за все время
                </section>
                <section className="text text_type_digits-large">{summary.total.toLocaleString()}</section>
            </div>
            <div className="mt-15">
                <section className="text text_type_main-medium">
                    Выполнено за сегодня
                </section>
                <section className="text text_type_digits-large">{summary.totalToday.toLocaleString()}</section>
            </div>
        </section>
    );
}

export default FeedSummary;