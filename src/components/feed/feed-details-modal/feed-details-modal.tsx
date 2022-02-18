import React, { useEffect, FC } from 'react';
import { useDispatch, useSelector } from '../../../services/types/hooks';
import { useHistory, useParams } from 'react-router-dom';
import Modal from '../../layout/modal/modal';
import { getOrderById, hideFeedItemDetailsModal } from '../../../services/actions/wsFeed';
import { TIdParam } from '../../../models/models';
import FeedItemDetails from '../feed-item-details/feed-item-details';

const FeedDetailsModal: FC = () => {
    const { viewedOrder, feedItemModalVisible, orders } = useSelector(state => state.feed);
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams<TIdParam>();

    useEffect(() => {
        if (id && orders.length !== 0) {
            dispatch(getOrderById(id));
        }
    }, [dispatch, orders, id]);

    const onCancelSelectIngredient = () => {
        history.goBack();
        dispatch(hideFeedItemDetailsModal());
    }

    return (<Modal visible={feedItemModalVisible} onCancel={onCancelSelectIngredient}>
        <FeedItemDetails feedItem={viewedOrder} />
    </Modal>);
}

export default FeedDetailsModal;
