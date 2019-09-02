import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import ResetPassword from './presenter';

class Container extends Component {
  state = {
    email: "",
    success: false
  };

  static propTypes = {
    passwordReset: PropTypes.func.isRequired
  };

  handleInputChange = event => {
    const {target: {value, name}} = event;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = async (event) => {
    const {email} = this.state;
    const {passwordReset} = this.props;
    event.preventDefault();
    const result = await passwordReset(email);
    console.log(`result ${result}`);
    if(result === 'success'){
      alert("메일이 전송되었습니다.");
      this.setState({
        success: true
      });
    }else{
      if(result.non_field_errors){
        alert(result.non_field_errors);
      }else if(result.email){
        alert(`[이메일] ${result.email}`);
      }else{
        alert('존재하지 않는 이메일이거나 네트워크가 불안정합니다.');
      }

    }
  }

  render(){
    const {email, success} = this.state;
    if(success){
      return <Redirect to="/" />
    }

    return (
      <ResetPassword
        email={email}
        handleInputChange={this.handleInputChange}
        handleSubmit={this.handleSubmit}
       />
    );

  }

}

export default Container;
