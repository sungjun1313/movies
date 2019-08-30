import React, {Component} from 'react';

import Main from './presenter';

class Container extends Component{
  render(){
    return <Main {...this.props} />;
  }
}

export default Container;
