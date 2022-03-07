import React, { FC, useEffect } from 'react';
import NavContainer from '../components/profile/nav-container';
import styles from './profile.module.css';
import { useDispatch, useSelector } from '../services/types/hooks';
import { IFeedItem } from '../models/models';
import { showProfileOrderDetails, wsProfileFeedConnectionStart } from '../services/actions/wsProfileFeed';
import Feed from '../components/feed/feed';

export const HistoryPage: FC = () => {
    const dispatch = useDispatch();
    const { orders, wsProfileConnected } = useSelector(state => state.profileFeed);

    const onSelectFeedItem = (feedItem: IFeedItem) => {
        dispatch(showProfileOrderDetails(feedItem));
    }

    useEffect(() => {
        if (!wsProfileConnected) {
            dispatch(wsProfileFeedConnectionStart());
        }
    }, [dispatch, wsProfileConnected]);

    return (<section className={`${styles.container} pt-20`}>
        <NavContainer />
        <section>
            <div className={styles.profileFeedContainer}>
                <div className={styles.profileFeed}>
                    <Feed orders={orders} onSelectFeedItem={onSelectFeedItem} pathToItem="profile/orders" reverse={true} />
                </div>
            </div>
        </section>
    </section>)
}