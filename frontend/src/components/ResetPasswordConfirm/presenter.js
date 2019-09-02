import React from 'react';
import PropTypes from 'prop-types';
import styles from './resetPasswordConfirm.module.css';

const ResetPasswordConfirm = (props) => (
  <div className={styles.container}>
    <h3 className={styles.headerStyle}>비밀번호 초기화</h3>
    <form onSubmit={props.handleSubmit}>
      <input className={styles.inputStyle} type="password" placeholder="새 비밀번호" onChange={props.handleInputChange} name="new_password1" value={props.new_password1} />
      <input className={styles.inputStyle} type="password" placeholder="비밀번호 확인" onChange={props.handleInputChange} name="new_password2" value={props.new_password2} />
      <input className={styles.btnStyle} type="submit" value="초기화" />
    </form>
  </div>
);

ResetPasswordConfirm.propTypes = {
  new_password1:PropTypes.string,
  new_password2: PropTypes.string,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default ResetPasswordConfirm;
