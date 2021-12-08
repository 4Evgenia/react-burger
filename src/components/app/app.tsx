import React from 'react';
import Header from '../layout/app-header/header';
import Main from '../layout/main/main';
import styles from './app.module.css';

function App() {
  return (
    <div className={styles.container}>
      <Header />
      <Main />
    </div>
  );
}

export default App;
