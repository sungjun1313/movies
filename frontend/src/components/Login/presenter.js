import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import styles from './login.module.css';


const Login = props => (
  <div className={styles.container}>
    <h3 className={styles.headerStyle}>로그인</h3>
    <form onSubmit={props.handleSubmit}>
      <input className={styles.inputStyle} type="text" placeholder="아이디" onChange={props.handleInputChange} name="username" value={props.username} required />
      <input className={styles.inputStyle} type="password" placeholder="비밀번호" onChange={props.handleInputChange} name="password" value={props.password} required />
      <input className={styles.btnStyle} type="submit" value="로그인" />
    </form>
    <div className={styles.linkBox}>
      <Link to="/register/">회원가입</Link>
      <Link to="/password/reset/">비밀번호 초기화</Link>
    </div>
  </div>
);

Login.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default Login;
