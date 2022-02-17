import React, { FC } from "react";
import styles from './feed.module.css';
import FeedItems, { TFeedProps } from '../feed/feed-items/feed-items';



const Feed: FC<TFeedProps> = ({orders}) => {
    return (
        <section className={styles.container}>
            <div className="pl-5">
                <section className="mt-10">
                    <h1 className="text text_type_main-large">Лента заказов</h1>
                </section>
                <section className="mt-5">
                        <div className={styles.scroll}>
                            <FeedItems orders={orders}/>
                        </div>
                 </section>
            </div>
        </section>
    );
}

export default Feed;
