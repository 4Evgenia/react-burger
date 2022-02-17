import React, { FC, useEffect } from 'react';
import FeedItemDetails from '../components/feed/feed-item-details/feed-item-details';
import styles from './page.module.css';
import { useDispatch, useSelector } from '../services/types/hooks';
import { useParams } from 'react-router-dom';
import { TIdParam } from '../models/models';
import { wsProfileFeedConnectionStart, getProfileOrderById } from '../services/actions/wsProfileFeed';

export const OrderHistoryPage: FC = () => {
    const {wsProfileConnected, viewedOrder, orders } = useSelector(state => state.profileFeed);
    const dispatch = useDispatch();
    const { id } = useParams<TIdParam>();

    useEffect(() => {
        if (!wsProfileConnected) {
            dispatch(wsProfileFeedConnectionStart());
        }
        else{
            dispatch(getProfileOrderById(id));
        }
    }, [dispatch, id, wsProfileConnected, orders]);
    
    return (<section className={styles.container}>
        <FeedItemDetails feedItem={viewedOrder} />
    </section>)
}