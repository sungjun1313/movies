import { connect } from "react-redux";
import { actionCreators as userActions } from "../../redux/modules/users";
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
