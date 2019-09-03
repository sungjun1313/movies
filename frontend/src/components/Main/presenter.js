import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter,Route, Switch} from 'react-router-dom';

import {PrivateRoute, LoginNotAllowRoute} from '../Router';
import ScrollToTop from '../Common/scrollToTop';
import Footer from '../Footer';
import Header from '../Header';
import Login from '../Login';
import Register from '../Register';
import ChangeProfile from '../ChangeProfile';
import ChangePassword from '../ChangePassword';
import ResetPassword from '../ResetPassword';
import ResetPasswordConfirm from '../ResetPasswordConfirm';
import Profile from '../Profile';
import MovieList from '../MovieList';
import MovieDetail from '../MovieDetail';

const Main = props => (
  <BrowserRouter>
    <ScrollToTop>
      {/*header footer component isLogin 속성 활용*/}
      <Header isLogin={props.isLogin} />
      <Switch>
        <Route exact path="/" component={MovieList} />
        <LoginNotAllowRoute exact path="/login/" isLogin={props.isLogin} component={Login} />
        <LoginNotAllowRoute exact path="/password/reset/" isLogin={props.isLogin} component={ResetPassword} />
        <LoginNotAllowRoute exact path="/password/reset/confirm/:uid/:token/" isLogin={props.isLogin} component={ResetPasswordConfirm} />
        <LoginNotAllowRoute exact path="/register/" isLogin={props.isLogin} component={Register} />
        <PrivateRoute exact path="/profile/" isLogin={props.isLogin} component={Profile} />
        <PrivateRoute exact path="/change/profile/" isLogin={props.isLogin} component={ChangeProfile} />
        <PrivateRoute exact path="/change/password/" isLogin={props.isLogin} component={ChangePassword}  />
        <PrivateRoute exact path="/detail/" isLogin={props.isLogin} component={MovieDetail} />
      </Switch>
      <Footer />
    </ScrollToTop>
  </BrowserRouter>
);

Main.propTypes = {
  isLogin: PropTypes.bool.isRequired,
};

export default Main;
