import {connect} from 'react-redux';
import {actionCreators as userActions} from '../../redux/modules/users';
import Container from './container';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    passwordReset: async (email) => {
      return await dispatch(userActions.passwordReset(email));
    }
  };
};

export default connect(null, mapDispatchToProps)(Container);
