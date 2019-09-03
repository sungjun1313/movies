import {connect} from 'react-redux';
import Container from './container';
import {actionCreators as userActions} from '../../redux/modules/users';

const mapStateToProps = (state, ownProps) => {
  const {users: {profile}} = state;
  return {
    profile
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getProfile: async () => {
      return await dispatch(userActions.getProfile());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
