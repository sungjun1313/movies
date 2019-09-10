//import
import {checkEnvReturnUrl} from '../../utils';
import {actionCreators as userActions} from './users';


//action types
const SET_MOVIELIST = "SET_MOVIELIST";
const SET_MOVIEDETAIL = "SET_MOVIEDETAIL";
const CREATE_REVIEW = "CREATE_REVIEW";
const UPDATE_REVIEW = "UPDATE_REVIEW";
const DELETE_REVIEW = "DELETE_REVIEW";



//action creators
function setMovieList(payload){
  return {
    type: SET_MOVIELIST,
    payload
  };
};

function setMovieDetail(movie){
  return {
    type: SET_MOVIEDETAIL,
    movie
  };
};

function createReview(payload){
  return {
    type: CREATE_REVIEW,
    payload
  };
};

function updateReview(payload){
  return {
    type: UPDATE_REVIEW,
    payload
  };
};

function deleteReview(payload, review_id){
  return {
    type: DELETE_REVIEW,
    payload,
    review_id
  };
};


//API actions
function getMovieList(page, search){
  return async (dispatch, getState) => {

    let defaultPage = 1;
    let defaultSearch = '';
    let url = '';
    if(typeof Number(page) === 'number' && page > 0){
      defaultPage = page;
    }

    if(typeof search === 'string'){
      defaultSearch = search;
    }

    //console.log(defaultPage);

    if(search){
      url = checkEnvReturnUrl(`/movies/?page=${defaultPage}&search=${defaultSearch}`);
    }else{
      url = checkEnvReturnUrl(`/movies/?page=${defaultPage}`);
    }

    try{
      const result = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const resultJson = await result.json();
      console.log(resultJson);
      if(result.ok){
        dispatch(setMovieList(resultJson));
        return 'success';
      }else{
        return resultJson;
      }
    }catch(err){
      console.log(err);
    }

  }
}

function getMovieDetail(id){
  return async (dispatch, getState) => {
    const {users: {token}} = getState();
    const url = checkEnvReturnUrl(`/movies/detail/${id}/`);
    try{
      const result = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `JWT ${token}`
          }
        });
      if(result.status === '401'){
        dispatch(userActions.logout());
      }

      const resultJson = await result.json();
      console.log(resultJson);

      if(result.ok){
        dispatch(setMovieDetail(resultJson));
        return 'success';
      }else{
        return resultJson;
      }

    }catch(err){
      console.log(err);
    }
  }
}

function createReviewAction(cinema_id, grade, body){
  return async (dispatch, getState) => {
    const {users: {token}} = getState();
    const url = checkEnvReturnUrl('/movies/create/review/');
    try{
      const result = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `JWT ${token}`
          },
          body: JSON.stringify({
            cinema_id,
            grade,
            body
          })
        });
      if(result.status === '401'){
        dispatch(userActions.logout());
      }

      const resultJson = await result.json();
      console.log(resultJson);

      if(result.ok){
        dispatch(createReview(resultJson));
        return 'success';
      }else{
        return resultJson;
      }
    }catch(err){
      console.log(err);
    }
  }
}

function updateReviewAction(id, cinema_id, grade, body){
  return async (dispatch, getState) => {
    const {users: {token}} = getState();
    const url = checkEnvReturnUrl(`/movies/update/review/${id}/`);
    try{
      const result = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `JWT ${token}`
          },
          body: JSON.stringify({
            cinema_id,
            grade,
            body
          })
        });
      if(result.status === '401'){
        dispatch(userActions.logout());
      }

      const resultJson = await result.json();
      console.log(resultJson);

      if(result.ok){
        dispatch(updateReview(resultJson));
        return 'success';
      }else{
        return resultJson;
      }
    }catch(err){
      console.log(err);
    }
  }
}

function deleteReviewAction(id, cinema_id){
  return async (dispatch, getState) => {
    const {users: {token}} = getState();
    const url = checkEnvReturnUrl(`/movies/delete/review/${id}/`);
    try{
      const result = await fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `JWT ${token}`
          },
          body: JSON.stringify({
            cinema_id
          })
        });
      if(result.status === '401'){
        dispatch(userActions.logout());
      }

      const resultJson = await result.json();
      console.log(resultJson);
      if(result.ok){
        dispatch(deleteReview(resultJson, id));
        return 'success';
      }else{
        return resultJson;
      }
    }catch(err){
      console.log(err);
    }
  }
}


//initial state
const initialState = {
  movie_list: [],
  movie_detail: null,
  page_count: 0,
  page_next: null,
  page_prev: null,
}

//reducer
function reducer(state=initialState, action){
  switch(action.type){
    case SET_MOVIELIST:
      return applySetMovieList(state, action);
    case SET_MOVIEDETAIL:
      return applySetMovieDetail(state, action);
    case CREATE_REVIEW:
      return applyCreateReview(state, action);
    case UPDATE_REVIEW:
      return applyUpdateReview(state, action);
    case DELETE_REVIEW:
      return applyDeleteReview(state, action);
    default:
      return state;
  }
}


//reducer functions
function applySetMovieList(state, action){
  const {payload} = action;
  return {
    ...state,
    movie_list: [...payload.results],
    page_count: payload.count,
    page_next: payload.next,
    page_prev: payload.previous
  };
};

function applySetMovieDetail(state, action){
  const {movie} = action;
  return {
    ...state,
    movie_detail: movie
  };
};

function applyCreateReview(state, action){
  const {payload} = action;
  const newCinemaReview = [
    {...payload.review},
    ...state.movie_detail.cinema_reviews
  ];
  const newMovieDetail = {
    ...state.movie_detail,
    average_grade: payload.avg,
    total_reviews: payload.count,
    cinema_reviews: newCinemaReview
  };
  return {
    ...state,
    movie_detail: newMovieDetail
  };
};

function applyUpdateReview(state, action){
  const {payload} = action;
  const newCinemaReview = state.movie_detail.cinema_reviews.map(existingReview => {
    if(existingReview.id === payload.review.id){
      return {...payload.review};
    }
    return existingReview;
  });
  const newMovieDetail = {
    ...state.movie_detail,
    average_grade: payload.avg,
    total_reviews: payload.count,
    cinema_reviews: newCinemaReview
  };
  return {
    ...state,
    movie_detail: newMovieDetail
  };
};

function applyDeleteReview(state, action){
  const {review_id, payload} = action;
  const newCinemaReview = state.movie_detail.cinema_reviews.filter(existingReview => {
    return existingReview.id !== review_id;
  });
  const newMovieDetail = {
    ...state.movie_detail,
    average_grade: payload.avg,
    total_reviews: payload.count,
    cinema_reviews: newCinemaReview
  };
  return {
    ...state,
    movie_detail: newMovieDetail
  };
};


//export
const actionCreators = {
  getMovieList,
  getMovieDetail,
  createReviewAction,
  updateReviewAction,
  deleteReviewAction
};

export {actionCreators};

export default reducer;
