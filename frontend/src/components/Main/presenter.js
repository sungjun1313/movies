import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter,Route, Switch} from 'react-router-dom';

import {PrivateRoute, LoginNotAllowRoute} from '../Router';
import Footer from '../Footer';
import Header from '../Header';
import Login from '../Login';
import MovieList from '../MovieList';
import MovieDetail from '../MovieDetail';

const Main = props => (
  <BrowserRouter>
    {/*header footer component isLogin 속성 활용*/}
    <Header isLogin={props.isLogin} />
    <Switch>
      <Route exact path="/" component={MovieList} />
      <LoginNotAllowRoute exact path="/login/" isLogin={props.isLogin} component={Login} />
      <PrivateRoute exact path="/detail/" isLogin={props.isLogin} component={MovieDetail} />
    </Switch>
    <Footer />
  </BrowserRouter>
);

Main.propTypes = {
  isLogin: PropTypes.bool.isRequired,
};

export default Main;
