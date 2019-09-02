import React from 'react';
import PropTypes from 'prop-types';
import styles from './resetPassword.module.css';

const ResetPassword = (props) => (
  <div className={styles.container}>
    <h3 className={styles.headerStyle}>비밀번호 초기화</h3>
    <form onSubmit={props.handleSubmit}>
      <input className={styles.inputStyle} type="email" placeholder="이메일" onChange={props.handleInputChange} name="email" value={props.email} required />
      <input className={styles.btnStyle} type="submit" value="초기화" />
    </form>
  </div>
);

ResetPassword.propTypes = {
  email: PropTypes.string,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default ResetPassword;
