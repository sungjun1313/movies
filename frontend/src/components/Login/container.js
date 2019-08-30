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

  handleSubmit = event => {
    const {login} = this.props;
    const {username, password} = this.state;
    event.preventDefault();
    login(username, password);
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
