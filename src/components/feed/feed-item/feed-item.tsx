import React, { FC } from "react";
import styles from './feed-item.module.css';
import { calculateDateString, calculateTotal } from '../../../utils/utils';
import Status from '../../shared/status';
import FeedIngredients from '../feed-ingredients/feed-ingredients';
import { IFeedItem } from "../../../models/models";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export type TFeedItemProps = {
    feedItem: IFeedItem,
    showItemStatus: boolean
};

const FeedItem: FC<TFeedItemProps> = ({feedItem, showItemStatus}) => {
    return (
        <div className={`${styles.card} p-6 mr-2 mb-6`}>
            <div className={styles.row}>
                <div className="text text_type_digits-default">#{feedItem.number}</div>
                <div className="text text_type_main-default text_color_inactive">
                    {calculateDateString(feedItem.date)}
                </div>
            </div>
            <div className="text text_type_main-medium mt-6">
                {feedItem.title}
            </div>
            {showItemStatus && <div className="mt-2">
                <Status status={feedItem.status} />
            </div>}
            <div className={`${styles.row} mt-6`}>
                <FeedIngredients ingredients={feedItem.ingredients} maxIngredients={4}/>
                <div className={styles.price}>
                    <div className="text text_type_digits-default mr-2">{calculateTotal(feedItem.ingredients)}</div>
                    <div>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeedItem;