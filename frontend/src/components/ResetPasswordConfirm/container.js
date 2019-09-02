import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import ResetPasswordConfirm from './presenter';

class Container extends Component {
  state = {
    new_password1:'',
    new_password2:'',
    success: false
  };

  static propTypes = {
    passwordResetConfirm: PropTypes.func.isRequired
  }

  handleInputChange = event => {
    const {target: {value, name}} = event;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = async (event) => {
    const {new_password1, new_password2} = this.state;
    const {passwordResetConfirm} = this.props;
    const {uid, token} = this.props.match.params;
    event.preventDefault();

    const result = await passwordResetConfirm(new_password1, new_password2, uid, token);
    console.log(`result ${result}`);

    if(result === 'success'){
      alert('비밀번호가 변경되었습니다.');
      this.setState({
        success: true
      });
    }else{
      if(result.non_field_errors){
        alert(result.non_field_errors);
      }else if(result.new_password1){
        alert(`[새비밀번호] ${result.new_password1}`);
      }else if(result.new_password2){
        alert(`[새비밀번호] ${result.new_password2}`);
      }else{
        alert('토큰이 만료되었거나 네트워크가 불안정합니다');
      }
    }
  }

  render(){
    const {new_password1, new_password2, success} = this.state;
    if(success){
      return <Redirect to="/login/" />
    }
    return(
      <ResetPasswordConfirm
        new_password1={new_password1}
        new_password2={new_password2}
        handleInputChange={this.handleInputChange}
        handleSubmit={this.handleSubmit}
       />
    );
  }
}

export default Container;
