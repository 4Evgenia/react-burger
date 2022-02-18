import React, { useEffect, FC } from 'react';
import { useDispatch, useSelector } from '../../services/types/hooks';
import { useHistory, useParams } from 'react-router-dom';
import Modal from '../layout/modal/modal';
import { getProfileOrderById, hideProfileFeedItemDetailsModal } from '../../services/actions/wsProfileFeed';
import { TIdParam } from '../../models/models';
import FeedItemDetails from '../feed/feed-item-details/feed-item-details';

const ProfileFeedDetailsModal: FC = () => {
    const { viewedOrder, orders, profileItemModalVisible } = useSelector(state => state.profileFeed);
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams<TIdParam>();

    useEffect(() => {
        if (id && orders.length !== 0) {
            dispatch(getProfileOrderById(id));
        }
    }, [dispatch, orders, id]);

    const onCancelSelectIngredient = () => {
        history.goBack();
        dispatch(hideProfileFeedItemDetailsModal());
    }

    return (<Modal visible={profileItemModalVisible} onCancel={onCancelSelectIngredient}>
        <FeedItemDetails feedItem={viewedOrder} />
    </Modal>);
}

export default ProfileFeedDetailsModal;
