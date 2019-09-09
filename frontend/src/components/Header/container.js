import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import Header from './presenter';

class Container extends  Component{
  static propTypes = {
    isLogin: PropTypes.bool.isRequired,
  }

  state = {
    width:0,
    menuOpen: false
  }

  componentDidMount(){
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({
      width: window.innerWidth,
      menuOpen: false
    });
  }

  menuClick = async (e) => {
    //console.log(e.target.name);

    this.setState(prevState => {
      const {menuOpen} = prevState;

      return {
        menuOpen: !menuOpen
      }

    });

    if(e.target.name === 'logout'){
      e.preventDefault();
      const {logout} = this.props;
      if(window.confirm('로그아웃하시겠습니까?')){
        logout();
      }else{
        console.log('로그아웃안함');
      }
    }


    if(e.target.name === 'main'){
      const {getMovieList} = this.props;
      const result = await getMovieList(1, '');
      if(result !== 'success'){
        if(result.detail){
          alert(result.detail);
        }else{
          alert('네트워크가 불안정합니다.');
        }
      }
    }

  }


  render(){
    const {width, menuOpen} = this.state;
    const {isLogin} = this.props;
    const isMobile = width <= 800;

    return (
      <Fragment>
        {/*header fixed 속성때문에 임시로 넓혀놓음*/}
        <div style={{marginTop:'60px'}}></div>
        <Header
          isLogin={isLogin}
          isMobile={isMobile}
          menuOpen={menuOpen}
          menuClick={this.menuClick}
        />
      </Fragment>
    );
  }
}

export default Container;
