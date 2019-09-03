import React from 'react';
import PropTypes from 'prop-types';
import styles from './changePassword.module.css';

const ChangePassword = (props) => (
  <div className={styles.container}>
    <h3 className={styles.headerStyle}>비밀번호 변경</h3>
    <form onSubmit={props.handleSubmit}>
      <input className={styles.inputStyle} type="password" placeholder="이전 비밀번호" onChange={props.handleInputChange} name="old_password" value={props.old_password} required />
      <input className={styles.inputStyle} type="password" placeholder="새 비밀번호" onChange={props.handleInputChange} name="new_password1" value={props.new_password1} required />
      <input className={styles.inputStyle} type="password" placeholder="새 비밀번호 확인" onChange={props.handleInputChange} name="new_password2" value={props.new_password2} required />
      <input className={styles.btnStyle} type="submit" value="변경" />
    </form>
  </div>
);

ChangePassword.propTypes = {
  old_password: PropTypes.string,
  new_password1: PropTypes.string,
  new_password2: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
}

export default ChangePassword;
