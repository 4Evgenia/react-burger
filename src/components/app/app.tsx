import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../layout/app-header/header';
import { ConstructorPage, ForgotPasswordPage, IngredientPage, LoginPage, ProfilePage, RegisterPage, ResetPasswordPage, OrdersPage, OrderHistoryPage, NotFoundPage  } from '../../pages';
import styles from './app.module.css';
import ErrorBoundary from '../shared/error-boundary';
import { ROUTES } from '../../models/constants';
import { ProtectedRoute } from '../protected-route';
import { UnauthRoute } from '../unauth-route';

function App() {
  return (
    <ErrorBoundary>
    <div className={styles.container}>
      <Router>
      <Header />
        <Switch>
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
      </Router>
    </div>
    </ErrorBoundary>
  );
}

export default App;
