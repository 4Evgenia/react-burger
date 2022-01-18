import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../layout/app-header/header';
import { ConstructorPage, ForgotPasswordPage, IngredientPage, LoginPage, ProfilePage, RegisterPage, ResetPasswordPage, OrdersPage, OrderHistoryPage  } from '../../pages';
import styles from './app.module.css';
import ErrorBoundary from '../shared/error-boundary';
import { ROUTES } from '../../models/constants';

function App() {
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
          <Route path={ROUTES.Profile.path} exact={true}>
            <ProfilePage />
          </Route>
          <Route path={ROUTES.History.path} exact={true}>
            <OrderHistoryPage />
          </Route>
          <Route path={ROUTES.Ingredient.path} exact={true}>
            <IngredientPage />
          </Route>
          <Route path={ROUTES.Orders.path} exact={true}>
            <OrdersPage />
          </Route>
        </Switch>
      </Router>
    </div>
    </ErrorBoundary>
  );
}

export default App;
