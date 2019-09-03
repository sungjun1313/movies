import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import ChangePassword from './presenter';

class Container extends Component {
  state = {
    old_password: '',
    new_password1: '',
    new_password2: '',
    success: false
  };

  static propTypes = {
    changePassword: PropTypes.func.isRequired
  };

  handleInputChange = event => {
    const {target: {value, name}} = event;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = async (event) => {
    const {old_password, new_password1, new_password2} = this.state;
    const {changePassword} = this.props;
    event.preventDefault();
    const result = await changePassword(old_password, new_password1, new_password2);
    if(result !== 'success'){
      if(result.non_field_errors){
        alert(result.non_field_errors);
      }else if(result.old_password){
        alert(`[이전 비밀번호] ${result.old_password}`);
      }else if(result.new_password1){
        alert(`[새비밀번호] ${result.new_password1}`);
      }else if(result.new_password2){
        alert(`[새비밀번호] ${result.new_password2}`);
      }else{
        alert('네트워크가 불안정합니다.');
      }
    }

    if(result === 'success'){
      alert('비밀번호가 변경되었습니다.');
      this.setState({
        success: true
      });
    }

  };

  render(){
    const {old_password, new_password1, new_password2, success} = this.state;
    if(success){
      return <Redirect to="/profile/" />
    }
    return (
      <ChangePassword
        old_password={old_password}
        new_password1={new_password1}
        new_password2={new_password2}
        handleInputChange={this.handleInputChange}
        handleSubmit={this.handleSubmit}
       />
    );
  };
}

export default Container;
