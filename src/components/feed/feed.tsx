import React, { FC } from "react";
import styles from './feed.module.css';
import FeedItems, { TFeedProps } from '../feed/feed-items/feed-items';

const Feed: FC<TFeedProps> = ({ orders, onSelectFeedItem, pathToItem, header, reverse }) => {
    return (
        <section>
            <div className="pl-5">
                {header && <section className="mt-10">
                    <h1 className="text text_type_main-large">{header}</h1>
                </section>}
                <section className="mt-5">
                    <div className={styles.scroll}>
                        <FeedItems
                            orders={orders}
                            onSelectFeedItem={onSelectFeedItem}
                            pathToItem={pathToItem}
                            reverse={reverse} />
                    </div>
                </section>
            </div>
        </section>
    );
}

export default Feed;
