import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Login from './presenter';

class Container extends Component{
  static propTypes = {
    login: PropTypes.func.isRequired
  }

  state = {
    username: '',
    password: ''
  }

  handleInputChange = event => {
    const {target: {value, name}} = event;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = async (event) => {
    const {login} = this.props;
    const {username, password} = this.state;
    event.preventDefault();
    const result = await login(username, password);
    console.log(result);
    if(result !== 'success'){
      if(result.non_field_errors){
        alert(result.non_field_errors);
      }else if(result.username){
        alert(`[아이디] ${result.username}`);
      }else if(result.password){
        alert(`[비밀번호] ${result.password}`);
      }
    }
  };

  render(){
    const {username, password} = this.state;
    return (
      <Login
        handleInputChange={this.handleInputChange}
        handleSubmit={this.handleSubmit}
        username={username}
        password={password}
      />
    );
  }
}

export default Container;
