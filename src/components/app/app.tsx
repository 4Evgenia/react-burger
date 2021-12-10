import React from 'react';
import Header from '../layout/app-header/header';
import Main from '../layout/main/main';
import styles from './app.module.css';
import ErrorBoundary from '../shared/error-boundary';

function App() {
  return (
    <ErrorBoundary>
    <div className={styles.container}>
      <Header />
      <Main />
    </div>
    </ErrorBoundary>
  );
}

export default App;
