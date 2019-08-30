//import
import {checkEnvReturnUrl} from '../../utils';


//action types
const SAVE_TOKEN = "SAVE_TOKEN";
const SET_PROFILE = "SET_PROFILE";
const LOGOUT = "LOGOUT";


//action creators
function saveToken(token){
  return {
    type: SAVE_TOKEN,
    token
  };
}

function setProfile(profile){
  return {
    type: SET_PROFILE,
    profile
  }
}

function logout(){
  return {
    type: LOGOUT
  }
}


//API actions
function userLogin(username, password){
  return dispatch => {
    const url = checkEnvReturnUrl("/rest-auth/login/");
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      if(json.token){
        dispatch(saveToken(json.token));
        dispatch(setProfile(json.user));
      }
    })
    .catch(err => console.log(err));
  }
}

function userLogout(){
  return (dispatch, getState) => {
    const {users: {token}} = getState();
    const url = checkEnvReturnUrl("/rest-auth/logout/");
    fetch(url, {
      method: "POST",
      headers:{
        Authorization: `JWT ${token}`
      }
    })
    .then(response => {
      console.log(response);
      dispatch(logout());
    })
    .catch(err => console.log(err));
  }
}


//initial state
const initialState = {
  isLogin: localStorage.getItem("jwt") ? true : false,
  token: localStorage.getItem("jwt"),
  profile: null
}


//reducer
function reducer(state=initialState, action){
  switch(action.type){
    case SAVE_TOKEN:
      return applySetToken(state, action);
    case SET_PROFILE:
      return applySetProfile(state, action);
    case LOGOUT:
      return applyLogout(state, action);
    default:
      return state;
  }
}


//reducer functions
function applySetToken(state, action){
  const {token} = action;
  localStorage.setItem("jwt", token);
  return {
    ...state,
    isLogin: true,
    token: token
  };
}

function applySetProfile(state, action){
  const {profile} = action;
  return {
    ...state,
    profile: profile
  }
}

function applyLogout(state, action){
  localStorage.removeItem("jwt");
  return {
    isLogin: false,
    token: null,
    profile: null
  }
}


//exports
const actionCreators = {
  userLogin,
  userLogout
};

export {actionCreators};

export default reducer;
