import React, {Component} from 'react';
import {Provider} from 'react-redux';

import store from './redux/configureStore';
import Main from './components/Main';

class App extends Component {
  render(){
    return(
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}

export default App;
