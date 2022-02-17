import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FeedItemDetails from '../components/feed/feed-item-details/feed-item-details';
import { useDispatch, useSelector } from '../services/types/hooks';
import { TIdParam } from '../models/models';
import { wsFeedConnectionStart, getOrderById } from '../services/actions/wsFeed';
import styles from './page.module.css';

export const FeedOrderPage: FC = () => {
    const {wsConnected, viewedOrder, orders } = useSelector(state => state.feed);
    const dispatch = useDispatch();
    const { id } = useParams<TIdParam>();

    useEffect(() => {
        if (!wsConnected) {
            dispatch(wsFeedConnectionStart());
        }
        else{
            dispatch(getOrderById(id));
        }
    }, [dispatch, id, wsConnected, orders]);

    return (
        <section className={styles.container}>
            <FeedItemDetails feedItem={viewedOrder} />
        </section>);
}