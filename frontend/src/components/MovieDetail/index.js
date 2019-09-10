import {connect} from 'react-redux';
import Container from './container';
import {actionCreators as movieActions} from '../../redux/modules/movies';

const mapStateToProps = (state, ownProps) => {
  const {movies: {movie_detail}} = state;
  return {
    movie_detail
  };
};

const mapDispatchToProps = (dispatch, onwProps) => {
  return {
    getMovieDetail: async (id) => {
      return await dispatch(movieActions.getMovieDetail(id));
    },
    createReviewAction: async (cinema_id, grade, body) => {
      return await dispatch(movieActions.createReviewAction(cinema_id, grade, body));
    },
    updateReviewAction: async (id, cinema_id, grade, body) => {
      return await dispatch(movieActions.updateReviewAction(id, cinema_id, grade, body));
    },
    deleteReviewAction: async (id, cinema_id) => {
      return await dispatch(movieActions.deleteReviewAction(id, cinema_id));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
