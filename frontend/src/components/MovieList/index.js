import {connect} from 'react-redux';
import {actionCreators as MovieActions} from '../../redux/modules/movies';
import Container from './container';

const mapStateToProps = (state, ownProps) => {
  const {users: {isLogin}} = state;
  const {movies: {movie_list, page_count, page_next, page_prev}} = state;
  return {
    isLogin,
    movie_list,
    page_count,
    page_next,
    page_prev
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getMovieList: async (page, search) => {
      return await dispatch(MovieActions.getMovieList(page, search));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
