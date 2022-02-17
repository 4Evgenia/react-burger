import React, { FC } from "react";
import { IFeedItem } from "../../../models/models";
import FeedItem from '../feed-item/feed-item';

export type TFeedProps = {
  orders: ReadonlyArray<IFeedItem>;
}

const FeedItems: FC<TFeedProps> = ({orders}) => {
  return (
    <section>
      {orders.map(item => (<FeedItem key={item._id} feedItem={item} showItemStatus={true} />))}
    </section>
  );
}

export default FeedItems;