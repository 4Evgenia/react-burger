import React, { FC, useEffect } from 'react';
import Feed from '../components/feed/feed';
import FeedSummary from '../components/feed/feed-summary';
import constructorStyles from './constructor.module.css';
import { useDispatch, useSelector } from '../services/types/hooks';
import { wsFeedConnectionStart } from '../services/actions/wsFeed';

export const FeedPage: FC = () => {
    const dispatch = useDispatch();
    const feed = useSelector(state => state.feed);

    useEffect(() => {
        if (!feed.wsConnected) {
            dispatch(wsFeedConnectionStart());
        }
    }, []);

    return (
        <main className={constructorStyles.container}>
            <Feed orders={feed.orders} />
            <FeedSummary summary={feed.summary} />
        </main>
    );
}