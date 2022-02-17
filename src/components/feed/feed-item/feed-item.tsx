import React, { FC } from "react";
import styles from './feed-item.module.css';
import { calculateDateString, calculateTotal } from '../../../utils/utils';
import Status from '../../shared/status';
import FeedIngredients from '../feed-ingredients/feed-ingredients';
import { IFeedItem } from "../../../models/models";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";

export type TSelectFeedITemFunc = (feedItem: IFeedItem) => void;

export type TFeedItemProps = {
    feedItem: IFeedItem,
    showItemStatus: boolean,
    onSelectFeedItem: TSelectFeedITemFunc
};

const FeedItem: FC<TFeedItemProps> = ({ feedItem, showItemStatus, onSelectFeedItem }) => {
    const selectFeedItem = () => onSelectFeedItem(feedItem);
    const location = useLocation<Location>();

    return (
        <div className={`${styles.card} p-6 mr-2 mb-6`} onClick={selectFeedItem}>
            <Link to={{ pathname: `/feed/${feedItem._id}`, state: { background: location } }}>
                <div className={styles.row}>
                    <div className="text text_type_digits-default"><span className={styles.primary}>#{feedItem.number}</span></div>
                    <div className="text text_type_main-default text_color_inactive">
                        {calculateDateString(feedItem.date)}
                    </div>
                </div>
                <div className="text text_type_main-medium mt-6">
                    <span className={styles.primary}>{feedItem.title}</span>
                </div>
                {showItemStatus && <div className="mt-2">
                    <Status status={feedItem.status} />
                </div>}
                <div className={`${styles.row} mt-6`}>
                    <FeedIngredients ingredients={feedItem.ingredients} maxIngredients={6} />
                    <div className={styles.price}>
                        <div className="text text_type_digits-default mr-2">
                            <span className={styles.primary}>{calculateTotal(feedItem.ingredients)}</span>
                        </div>
                        <div>
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default FeedItem;