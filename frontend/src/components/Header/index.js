import { connect } from "react-redux";
import { actionCreators as userActions } from "../../redux/modules/users";
import { actionCreators as movieActions } from "../../redux/modules/movies";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
  const { users: { isLogin } } = state;
  return {
    isLogin
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: () => {
      dispatch(userActions.userLogout());
    },

    getMovieList: async (page, search) => {
      return await dispatch(movieActions.getMovieList(page, search));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
