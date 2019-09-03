import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Profile from './presenter';

class Container extends Component{

  state = {
    loading: false
  }

  static propTypes = {
    getProfile: PropTypes.func.isRequired,
    profile: PropTypes.object
  };

  componentDidMount = async () =>{
    const {getProfile} = this.props;

    const result = await getProfile();
    if(result !== 'success'){
      alert(result);
    }
    if(result === 'success'){
      this.setState({
        loading: true
      });
    }
  };

  render(){
    const {loading} = this.state;
    if(!loading){
      return <h3>로딩중입니다.</h3>
    }
    const {profile} = this.props;
    console.log(profile);
    return (
      <Profile
        {...profile}
       />
    );
  };
}

export default Container;
