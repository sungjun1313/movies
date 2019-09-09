import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ChangeProfile from './presenter';
import {Redirect} from 'react-router-dom';

class Container extends Component {
  /*
  constructor(props){
    super(props);
    if(props.profile){
      console.log('vfvf');
      this.state = {
        success: false,
        name: props.profile.name,
        email: props.profile.email,
        profile_image: null,
        show_image: props.profile.profile_image,
        loading: true,
      }
    }else{
      this.state = {
        success: false,
        name: '',
        email: '',
        profile_image: null,
        show_image: '',
        loading: false
      }
    }
  }
  */

  state = {
    success: false,
    name: '',
    email: '',
    profile_image: null,
    show_image: '',
    delete_image: 'n',
    loaded: false
  }

  static propTypes = {
    profile: PropTypes.object,
    getProfile: PropTypes.func.isRequired,
    changeProfile: PropTypes.func.isRequired,
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

  componentDidUpdate = (prevProps, prevState) => {
    console.log('update');
    const {profile} = this.props;
    if(profile !== prevProps.profile){

      this.setState({
        name: profile.name,
        email: profile.email,
        profile_image: profile.profile_image
      });
    }
  };

  handleInputChange = event => {
    const {target: {value, name}} = event;
    if(name === 'profile_image'){
      //이미지 보여주기

      const files = event.target.files;
      const file = files[0];
      if(!file.type.match('image')){
        alert('이미지 파일만 가능합니다');
        return false;
      }
      console.log(file);

      this.setState({
        [name]: file,
        show_image: URL.createObjectURL(file)
      });

    }else if(name === 'delete_image'){
      this.setState(prevState => {
        let delete_image = 'n';
        if(prevState.delete_image === 'n'){
          delete_image = 'y';
        }
        return {
          delete_image: delete_image
        };
      });
    }else{
      this.setState({
        [name]: value
      });
    }

  };

  handleSubmit = async (event) => {
    const {name, email, profile_image, delete_image} = this.state;
    const {changeProfile, profile:{name : propsName, email: propsEmail}} = this.props;
    event.preventDefault();
    const formName = name ? name : propsName;
    const formEmail = email ? email : propsEmail;
    const result = await changeProfile(formName, formEmail, profile_image, delete_image);
    console.log(result);
    if(result !== 'success'){
      if(result.non_field_errors){
        alert(result.non_field_errors);
      }else if(result.name){
        alert(`[이름] ${result.name}`);
      }else if(result.email){
        alert(`[이메일] ${result.email}`);
      }else if(result.profile_image){
        alert(`[프로필사진] ${result.profile_image}`);
      }else{
        alert(`네트워크가 불안정합니다`);
      }
    }

    if(result === 'success'){
      this.setState({
        success: true
      });
    }
  }

  render(){
    const {name, email, profile_image, show_image, delete_image, success, loaded} = this.state;
    //const {profile} = this.props;
    //console.log(Profile);

    if(success){
      return <Redirect to="/profile/" />
    }

    if(!loaded){
      return <h3>로딩중입니다.</h3>;
    }

    return (
      <ChangeProfile
        name={name}
        email={email}
        profile_image={profile_image}
        show_image={show_image}
        delete_image={delete_image}
        handleSubmit={this.handleSubmit}
        handleInputChange={this.handleInputChange}
       />
    );
  };
}

export default Container
