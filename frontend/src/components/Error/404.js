import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import styles from './error.module.css';

const ErrorPage = (props) => (
  <div className={styles.alert}>
    <h2>404Page</h2>
    <div>잘못된 URL로 접근하셨습니다.</div>
    <div>
      <Link to="/">메인으로 가기</Link>
      <Link to="/" onClick={(e) => {e.preventDefault(); props.history.goBack();}}>뒤로 가기</Link>
    </div>
  </div>
);

export default withRouter(ErrorPage);
