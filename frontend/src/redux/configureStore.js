import {combineReducers, createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import users from './modules/users';
import movies from './modules/movies';

const env = process.env.NODE_ENV;

const middlewares = [thunk];

if(env === 'development'){
  const {logger} = require("redux-logger");
  middlewares.push(logger);
}

const reducer = combineReducers({
  users,
  movies
});

let store;

if(env === 'development'){
  store = initialState => createStore(reducer, composeWithDevTools(applyMiddleware(...middlewares)));
}else{
  store = initialState => createStore(reducer, applyMiddleware(...middlewares));
}

export default store();
