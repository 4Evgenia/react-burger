import { store } from '../store';
import { TAuthActions } from '../actions/auth';
import { TBurgerActions } from '../actions/burger';
import { TOrderActions } from '../actions/order';
import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

export type RootState = ReturnType<typeof store.getState>;
type TApplicationActions = TAuthActions | TBurgerActions | TOrderActions;
export type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = Dispatch<TApplicationActions>;

export type TAppStore = typeof store;