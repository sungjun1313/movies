//import
import {checkEnvReturnUrl} from '../../utils';
//import axios from 'axios';


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
  return async (dispatch) => {
    const url = checkEnvReturnUrl("/rest-auth/login/");

    try{
      const result = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username,
            password
          })
        });
      const resultJson = await result.json();
      //console.log(resultJson);
      if(resultJson.token){
        dispatch(saveToken(resultJson.token));
        dispatch(setProfile(resultJson.user));
        return 'success';
      }
      return resultJson;
    }catch(err){
      return err;
    }
    /*
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
    */
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


function passwordReset(email){
  return async (dispatch) => {
    const url = checkEnvReturnUrl("/rest-auth/password/reset/");
    try{
      const result = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email
          })
        });

      //const resultJson = await result.json();
      if(result.ok){
        return 'success';
      }else{
        return result.json();
      }
    }catch(err){
      return err;
    }
  }
}

function passwordResetConfirm(new_password1, new_password2, uid, token){
  return async (dispatch) => {
    const url = checkEnvReturnUrl("/rest-auth/password/reset/confirm/");
    try{
      const result = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            new_password1,
            new_password2,
            uid,
            token
          })
        });
      //const resultJson = await result.json();
      if(result.ok){
        return 'success';
      }else{
        return result.json();
      }
    }catch(err){
      return err;
    }
  }
}

function createAccount(username, name, email, password1, password2, profile_image){
  return async (dispatch) => {
    const url = checkEnvReturnUrl('/rest-auth/registration/');
    //const url = checkEnvReturnUrl('/users/register/');
    /*
    for(var pair of data.entries()){
      console.log(pair[0]+', '+pair[1]);
    }
    */
    try{

      const fd = new FormData();

      fd.append("username", username);
      fd.append("name", name);
      fd.append("email", email);
      fd.append("password1", password1);
      fd.append("password2", password2);
      fd.append("profile_image", profile_image);
      console.log(`${username} ${name} ${profile_image}`);
      for(var pair of fd.entries()){
        console.log(pair[0]+', '+pair[1]);
      }

      const result = await fetch(url, {
          method: "POST",
          headers: {

          },
          body: fd
        });

        /*
        body: JSON.stringify({
          username,
          name,
          email,
          password1,
          password2,
          profile_image
        })
        */

      console.log(result);
      const resultJson = await result.json();
      if(resultJson.token){
        dispatch(saveToken(resultJson.token));
        dispatch(setProfile(resultJson.user));
        return 'success';
      }
      return resultJson;
    }catch(err){
      return err;
    }
  }
}

function getProfile(){
  return async (dispatch, getState) => {
    const {users:{token}} = getState();
    const url = checkEnvReturnUrl("/rest-auth/user/");
    try{
      const result = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `JWT ${token}`
          }
        });
      console.log(result);
      if(result.status === 401){
        dispatch(logout());
      }

      const resultJson = await result.json();
      if(resultJson.username){
        dispatch(setProfile(resultJson));
        return 'success';
      }
      return resultJson;
    }catch(err){
      return err;
    }

  }

}

function changeProfile(name, email, profile_image, delete_image){
  return async (dispatch, getState) => {
    const {users: {token}} = getState();
    const url = checkEnvReturnUrl("/users/change/");
    try{
        const fd = new FormData();
        fd.append("name", name);
        fd.append("email", email);
        if(delete_image === 'y'){
          fd.append("profile_image", "");
        }else if(profile_image){
          if(typeof profile_image === 'object'){
            fd.append("profile_image", profile_image);
          }

        }


        const result = await fetch(url, {
            method: "PUT",
            headers: {
              "Authorization": `JWT ${token}`
            },
            body: fd
          });
        console.log(result);

        if(result.status === 401){
          dispatch(logout());
        }

        //const resultJson = await result.json();
        if(result.ok){
          return 'success';
        }else{
          return result.json();
        }

    }catch(err){
      return err;
    }

  }
}

function changePassword(old_password, new_password1, new_password2){
  return async (dispatch, getState) => {
    const {users: {token}} = getState();
    const url = checkEnvReturnUrl("/rest-auth/password/change/");

    try{
      const result = await fetch(url, {
        method: "POST",
        headers: {
          "Authorization": `JWT ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          old_password,
          new_password1,
          new_password2
        })
      });

      if(result.status === 401){
        dispatch(logout());
      }

      if(result.ok){
        return 'success';
      }
      return result.json();
    }catch(err){
      return err;
    }
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
  userLogout,
  logout,
  passwordReset,
  passwordResetConfirm,
  createAccount,
  getProfile,
  changeProfile,
  changePassword,
};

export {actionCreators};

export default reducer;
