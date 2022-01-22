import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../layout/app-header/header';
import { ConstructorPage, ForgotPasswordPage, IngredientPage, LoginPage, ProfilePage, RegisterPage, ResetPasswordPage, OrdersPage, OrderHistoryPage  } from '../../pages';
import styles from './app.module.css';
import ErrorBoundary from '../shared/error-boundary';
import { ROUTES } from '../../models/constants';
import { ProtectedRoute } from '../protected-route';
import { useDispatch } from 'react-redux';
import { getUser } from '../../services/actions/auth';

function App() {
  const dispatch = useDispatch();

  useEffect(() => { dispatch(getUser()) }, [dispatch]);

  return (
    <ErrorBoundary>
    <div className={styles.container}>
      <Router>
      <Header />
        <Switch>
          <Route path={ROUTES.Login.path} exact={true}>
            <LoginPage />
          </Route>
          <Route path={ROUTES.Register.path} exact={true}>
            <RegisterPage />
          </Route>
          <Route path={ROUTES.ForgotPassword.path} exact={true}>
            <ForgotPasswordPage />
          </Route>
          <Route path={ROUTES.ResetPassword.path} exact={true}>
            <ResetPasswordPage />
          </Route>
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
        </Switch>
      </Router>
    </div>
    </ErrorBoundary>
  );
}

export default App;
