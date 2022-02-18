import React, { FC, useEffect } from 'react';
import Feed from '../components/feed/feed';
import FeedSummary from '../components/feed/feed-summary';
import constructorStyles from './constructor.module.css';
import { useDispatch, useSelector } from '../services/types/hooks';
import { wsFeedConnectionStart } from '../services/actions/wsFeed';
import { IFeedItem } from '../models/models';
import { showOrderDetails } from '../services/actions/wsFeed';

export const FeedPage: FC = () => {
    const dispatch = useDispatch();
    const { orders, summary, wsConnected } = useSelector(state => state.feed);

    const onSelectFeedItem = (feedItem: IFeedItem) => {
        dispatch(showOrderDetails(feedItem));
    }

    useEffect(() => {
        if (!wsConnected) {
            dispatch(wsFeedConnectionStart());
        }
    }, [dispatch, wsConnected]);

    return (
        <main className={constructorStyles.container}>
            <div className={constructorStyles.feedContainer}>
                <Feed orders={orders} onSelectFeedItem={onSelectFeedItem} pathToItem="feed" header='Лента заказов'/>
            </div>
            <FeedSummary summary={summary} />
        </main>
    );
}