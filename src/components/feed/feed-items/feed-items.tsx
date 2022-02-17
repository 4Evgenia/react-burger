import React, { FC } from "react";
import { IFeedItem } from "../../../models/models";
import FeedItem, { TSelectFeedITemFunc } from '../feed-item/feed-item';

export type TFeedProps = {
  orders: ReadonlyArray<IFeedItem>;
  onSelectFeedItem: TSelectFeedITemFunc;
  pathToItem: string;
  header?:string;
  reverse?: boolean;
}

const FeedItems: FC<TFeedProps> = ({ orders, onSelectFeedItem, pathToItem, reverse }) => {
  return (
    <section style={{ display: "flex", flexDirection: reverse ? "column-reverse" : "column"}}>
      {orders.map(item => (<FeedItem key={item._id}
        feedItem={item}
        showItemStatus={true}
        onSelectFeedItem={onSelectFeedItem}
        pathToItem={pathToItem}
      />))}
    </section>
  );
}

export default FeedItems;