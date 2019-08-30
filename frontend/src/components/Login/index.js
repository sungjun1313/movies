import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userActions } from "../../redux/modules/users";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: (username, password) => {
      dispatch(userActions.userLogin(username, password));
    }
  };
};

export default connect(null, mapDispatchToProps)(Container);
