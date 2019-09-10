import React from 'react';
import styles from './loading.module.css';

const Loading = (props) => (
  <div className={styles.loadingWrap}>
    <div className={styles.loading}>
      <p>Loading</p>
      <div className={styles.line}></div>
      <div className={styles.line}></div>
      <div className={styles.line}></div>
    </div>
  </div>
);

export default Loading;
