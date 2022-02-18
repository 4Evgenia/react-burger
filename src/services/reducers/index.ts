import { combineReducers } from 'redux';
import { burgerReducer } from './burger';
import { orderReducer } from './order';
import { authReducer } from './auth';
import { feedReducer } from './feed';
import { profileFeedReducer } from './profileFeed';

export const rootReducer = combineReducers({
    burger: burgerReducer,
    order: orderReducer,
    auth: authReducer,
    feed: feedReducer,
    profileFeed: profileFeedReducer
});