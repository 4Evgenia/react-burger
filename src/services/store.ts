import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import { socketMiddleware } from '../services/middleware';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const feedWsUrl = "wss://norma.nomoreparties.space/orders/all";

export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(feedWsUrl)));

export const store = createStore(rootReducer, enhancer);


