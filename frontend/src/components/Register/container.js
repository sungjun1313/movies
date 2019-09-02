import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Register from './presenter';

class Container extends Component {
  state = {
    username: '',
    name: '',
    email: '',
    password1: '',
    password2: '',
    profile_image: '',
    show_image: ''
  };

  static propTypes = {
    createAccount: PropTypes.func.isRequired
  }

  handleInputChange = event => {
    const {target: {value, name}} = event;
    if(name === 'profile_image'){
      //이미지 보여주기
      if(window.File && window.FileList && window.FileReader){
        const files = event.target.files;
        const file = files[0];
        if(!file.type.match('image')){
          alert('이미지 파일만 가능합니다');
          return false;
        }
        console.log(file);

        this.setState({
          [name]: value,
          show_image: URL.createObjectURL(file)
        });
      }else{
        console.log('최신 크롬 브라우저를 설치해주세요.');
        this.setState({
          [name]: value
        });
      }


    }else{
      this.setState({
        [name]: value
      });
    }

  };

  handleSubmit = async (event) => {
    const {username, name, email, password1, password2, profile_image} = this.state;
    const {createAccount} = this.props;
    event.preventDefault();
    const result = await createAccount(username, name, email, password1, password2, profile_image);
    console.log(result);
    if(result !== 'success'){
      if(result.non_field_errors){
        alert(result.non_field_errors);
      }else if(result.username){
        alert(`[아이디] ${result.username}`);
      }else if(result.name){
        alert(`[이름] ${result.name}`);
      }else if(result.email){
        alert(`[이메일] ${result.email}`);
      }else if(result.password1){
        alert(`[비밀번호] ${result.password1}`);
      }else if(result.password2){
        alert(`[비밀번호] ${result.password2}`);
      }else if(result.profile_image){
        alert(`[프로필사진] ${result.profile_image}`);
      }else{
        alert(`네트워크가 불안정합니다`);
      }
    }
  }

  render(){
      const {username, name, email, password1, password2, profile_image, show_image} = this.state;
      return (
        <Register
          username={username}
          name={name}
          email={email}
          password1={password1}
          password2={password2}
          profile_image = {profile_image}
          show_image={show_image}
          handleInputChange={this.handleInputChange}
          handleSubmit={this.handleSubmit}
         />
      );
  }

}

export default Container;
