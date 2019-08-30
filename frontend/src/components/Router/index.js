import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';

export const PrivateRoute = ({component:Component, isLogin, ...rest}) => (
  <Route {...rest} render={props => {
      if(isLogin){
        return <Component {...props} />;
      }else{
        return <Redirect to="/login/" />;
      }
    }}
   />
);

PrivateRoute.propTypes = {
  isLogin: PropTypes.bool.isRequired
};

export const LoginNotAllowRoute = ({component:Component, isLogin, ...rest}) => (
  <Route {...rest} render={props => {
      if(!isLogin){
        return <Component {...props} />;
      }else{
        return <Redirect to="/" />;
      }
    }}
   />
);

LoginNotAllowRoute.propTypes = {
  isLogin: PropTypes.bool.isRequired
};
