import React from 'react';
import PropTypes from 'prop-types'

const Login = props => (
  <div>
    <form onSubmit={props.handleSubmit}>
      <input type="text" placeholder="아이디" onChange={props.handleInputChange} name="username" value={props.username} />
      <input type="password" placeholder="비밀번호" onChange={props.handleInputChange} name="password" value={props.password} />
      <input type="submit" value="로그인" />
    </form>
  </div>
);

Login.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default Login;
