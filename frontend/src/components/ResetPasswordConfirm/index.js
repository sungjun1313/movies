import {connect} from 'react-redux';
import {actionCreators as userActions} from '../../redux/modules/users';
import Container from './container';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    passwordResetConfirm: async (new_password1, new_password2, uid, token) => {
      return await dispatch(userActions.passwordResetConfirm(new_password1, new_password2, uid, token));
    }
  };
}

export default connect(null, mapDispatchToProps)(Container);
