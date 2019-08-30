import {connect} from 'react-redux';

import Container from './container';

const mapStateToProps = (state, ownProps) => {
  const {users: {isLogin}} = state;
  return {
    isLogin
  };
};

export default connect(mapStateToProps)(Container);
