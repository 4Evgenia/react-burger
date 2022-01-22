import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import Header from '../layout/app-header/header';
import { ConstructorPage, ForgotPasswordPage, IngredientPage, LoginPage, ProfilePage, RegisterPage, ResetPasswordPage, OrdersPage, OrderHistoryPage, NotFoundPage  } from '../../pages';
import styles from './app.module.css';
import ErrorBoundary from '../shared/error-boundary';
import { ROUTES } from '../../models/constants';
import { ProtectedRoute } from '../protected-route';
import { UnauthRoute } from '../unauth-route';
import BurgerDetailsModal from '../burger-details-modal/burger-details-modal';

function App() {
  const location = useLocation();
  const constructor = location.state && (location.state as any).constructor;
  return (
    <ErrorBoundary>
    <div className={styles.container}>
      <Header />
        <Switch location={constructor || location}>
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
            <OrderHistoryPage />
          </ProtectedRoute>
          <Route path={ROUTES.Ingredient.path} exact={true}>
            <IngredientPage />
          </Route>
          <ProtectedRoute path={ROUTES.Orders.path} exact={true}>
            <OrdersPage />
          </ProtectedRoute>
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>

        {constructor && <Route path={ROUTES.Ingredient.path} children={< BurgerDetailsModal />}></Route>}
    </div>
    </ErrorBoundary>
  );
}

export default App;
