import React, { FC } from "react";
import styles from './feed-item-details.module.css';
import { IFeedItem } from '../../../models/models';
import Status from '../../shared/status';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { calculateDateString, calculateTotal } from "../../../utils/utils";

export type FeedItemDetailsProps = {
    feedItem: IFeedItem | null,
}

const FeedItemDetails: FC<FeedItemDetailsProps> = ({ feedItem }) => {
    if (!feedItem)
        return null;

    return (<div className={styles.orderContainer}>
        <section className={`text text_type_digits-default ${styles.primary}`}>#{feedItem.number}</section>
        <section className={`${styles.startAllign} text text_type_main-medium mt-10 ${styles.primary}`}>
            {feedItem.title}
        </section>
        <section className={`${styles.startAllign} mt-3`}>
            <Status status={feedItem.status} />
        </section>
        <section className={`${styles.startAllign} text text_type_main-medium mt-10 mb-6 ${styles.primary}`}>
            Состав:
        </section>
        <section className={styles.scroll}>
            {feedItem.ingredients.map(ing => {
                return (
                    <div key={ing._id} className={`${styles.ingredientContainer} ${styles.primary} mt-4 mr-6`}>
                        <div className={styles.group}>
                            <div className={`${styles.imageContainer} mr-4`}>
                                <img src={ing.image_mobile} alt={ing.name} />
                            </div>
                            <div className={`text text_type_main-default ${styles.title}`}>{ing.name}</div>
                        </div>
                        <div className={`${styles.group}`}>
                            <div className={`text text_type_digits-default mr-2`}>{ing.qty} x {ing.price}</div>
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>
                )
            })}
        </section>
        <section className={`mt-10 ${styles.footer}`}>
            <div className="text text_type_main-default text_color_inactive">{calculateDateString(feedItem.date)}</div>
            <div className={`${styles.group} ${styles.primary}`}>
                <div className="text text_type_digits-default mr-2">{calculateTotal(feedItem.ingredients)}</div>
                <CurrencyIcon type="primary" />
            </div>

        </section>
    </div>);
}

export default FeedItemDetails;