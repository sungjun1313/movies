import React from 'react';
import PropTypes from 'prop-types';
import styles from './register.module.css';

const Register = (props) => (
  <div className={styles.container}>
    <h3 className={styles.headerStyle}>회원가입</h3>
    <form onSubmit={props.handleSubmit}>
      <input className={styles.inputStyle} type="text" placeholder="아이디" onChange={props.handleInputChange} name="username" value={props.username} required />
      <input className={styles.inputStyle} type="text" placeholder="이름" onChange={props.handleInputChange} name="name" value={props.name} required />
      <input className={styles.inputStyle} type="email" placeholder="이메일" onChange={props.handleInputChange} name="email" value={props.email} required />
      <input className={styles.inputStyle} type="file" placeholder="프로필 사진" onChange={props.handleInputChange} name="profile_image" />
      {props.show_image && <div className={styles.circle}><img src={props.show_image} className={styles.imageStyle} alt="프로필 사진" /></div>}
      <input className={styles.inputStyle} type="password" placeholder="비밀번호" onChange={props.handleInputChange} name="password1" value={props.password1} required />
      <input className={styles.inputStyle} type="password" placeholder="비밀번호 확인" onChange={props.handleInputChange} name="password2" value={props.password2} required />
      <input className={styles.btnStyle} type="submit" value="회원가입" />
    </form>
  </div>
)

Register.propTypes = {
  username: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  password1: PropTypes.string,
  password2: PropTypes.string,
  profile_image: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
}

export default Register;
