import { combineReducers } from 'redux';
import { burgerReducer } from './burger';
import { orderReducer } from './order';
import { authReducer } from './auth';
import { feedReducer } from './feed';

export const rootReducer = combineReducers({
    burger: burgerReducer,
    order: orderReducer,
    auth: authReducer,
    feed: feedReducer
});