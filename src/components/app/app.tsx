import React, { useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import Header from '../layout/app-header/header';
import {
  ConstructorPage,
  ForgotPasswordPage,
  IngredientPage,
  LoginPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
  FeedPage,
  OrderHistoryPage,
  NotFoundPage,
  FeedOrderPage,
  HistoryPage
} from '../../pages';
import styles from './app.module.css';
import ErrorBoundary from '../shared/error-boundary';
import { ROUTES } from '../../models/constants';
import { ProtectedRoute } from '../protected-route';
import { UnauthRoute } from '../unauth-route';
import BurgerDetailsModal from '../burger-details-modal/burger-details-modal';
import { useDispatch, useSelector } from '../../services/types/hooks';
import { getIngredients } from '../../services/actions/burger';
import { Location } from 'history';
import FeedDetailsModal from '../feed/feed-details-modal/feed-details-modal';

type TLocationBackground = {
  background?: Location
};

function App() {
  const {
    ingredients
  } = useSelector(state => state.burger);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!ingredients.length) dispatch(getIngredients());
  }, [dispatch, ingredients]);

  const location = useLocation<TLocationBackground>();
  const background = location.state && location.state.background;
  return (
    <ErrorBoundary>
      <div className={styles.container}>
        <Header />
        <Switch location={background || location}>
          <UnauthRoute path={ROUTES.Login.path} exact={true}>
            <LoginPage />
          </UnauthRoute>
          <UnauthRoute path={ROUTES.Register.path} exact={true}>
            <RegisterPage />
          </UnauthRoute>
          <UnauthRoute path={ROUTES.ForgotPassword.path} exact={true}>
            <ForgotPasswordPage />
          </UnauthRoute>
          <UnauthRoute path={ROUTES.ResetPassword.path} exact={true}>
            <ResetPasswordPage />
          </UnauthRoute>
          <Route path={ROUTES.Home.path} exact={true}>
            <ConstructorPage />
          </Route>
          <ProtectedRoute path={ROUTES.Profile.path} exact={true}>
            <ProfilePage />
          </ProtectedRoute>
          <ProtectedRoute path={ROUTES.History.path} exact={true}>
            <HistoryPage />
          </ProtectedRoute>
          <ProtectedRoute path={ROUTES.OrderHistory.path} exact={true}>
            <OrderHistoryPage />
          </ProtectedRoute>
          <Route path={ROUTES.Ingredient.path} exact={true}>
            <IngredientPage />
          </Route>
          <Route path={ROUTES.Feed.path} exact={true}>
            <FeedPage />
          </Route>
          <Route path={ROUTES.Order.path} exact={true}>
            <FeedOrderPage />
          </Route>
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>

        {background && 
          <Switch>
            <Route path={ROUTES.Ingredient.path} children={< BurgerDetailsModal />}></Route>
            <Route path={ROUTES.Order.path} children={< FeedDetailsModal />}></Route>
          </Switch>
        }
      </div>
    </ErrorBoundary>
  );
}

export default App;
