import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Profile from './presenter';
import Loading from '../Loading';

class Container extends Component{

  state = {
    loaded: false
  }

  static propTypes = {
    getProfile: PropTypes.func.isRequired,
    profile: PropTypes.object
  };

  componentDidMount = async () =>{
    const {getProfile} = this.props;

    const result = await getProfile();
    /*
    if(result !== 'success'){
      alert(result);
    }
    */
    if(result === 'success'){
      this.setState({
        loaded: true
      });
    }else{
      alert(result);
    }

  };

  render(){
    const {loaded} = this.state;
    if(!loaded){
      return <Loading />;
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
