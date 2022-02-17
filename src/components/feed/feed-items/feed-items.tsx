import React, { FC } from "react";
import { IFeedItem } from "../../../models/models";
import FeedItem, { TSelectFeedITemFunc } from '../feed-item/feed-item';

export type TFeedProps = {
  orders: ReadonlyArray<IFeedItem>;
  onSelectFeedItem: TSelectFeedITemFunc
}

const FeedItems: FC<TFeedProps> = ({orders, onSelectFeedItem}) => {
  return (
    <section>
      {orders.map(item => (<FeedItem key={item._id} feedItem={item} showItemStatus={true} onSelectFeedItem={onSelectFeedItem}/>))}
    </section>
  );
}

export default FeedItems;