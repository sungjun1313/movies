import {connect} from 'react-redux';
import {actionCreators as userActions} from '../../redux/modules/users';
import Container from './container';

const mapStateToProps = (state, onwProps) => {
  const {users: {profile}} = state;
  return {
    profile
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getProfile: async () => {
      return await dispatch(userActions.getProfile());
    },
    changeProfile: async (name, email, profile_image, delete_image) =>{
      return await dispatch(userActions.changeProfile(name, email, profile_image, delete_image));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container)
