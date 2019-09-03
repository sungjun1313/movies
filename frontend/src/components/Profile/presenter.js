import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import {Link} from 'react-router-dom';
import styles from './profile.module.css';
import noImage from '../Images/noPhoto.jpg';

const Profile = (props) => (
  <div className={styles.container}>
    <h3 className={styles.headerStyle}>회원정보</h3>
    <div className={styles.infoBox}>

      <div className={styles.infoLeft}>
        <div className={styles.circleBox}>
          {props.profile_image ? <img src={props.profile_image} alt="프로필사진" /> : <img src={noImage} alt="프로필사진" /> }
        </div>
      </div>

      <div className={styles.infoRight}>
        <div>
          <div className={styles.contentTitle}>아이디</div>
          <div>{props.username}</div>
        </div>
        <div>
          <div className={styles.contentTitle}>이름</div>
          <div>{props.name}</div>
        </div>
        <div>
          <div className={styles.contentTitle}>이메일</div>
          <div>{props.email}</div>
        </div>
        <div>
          <div className={styles.contentTitle}>가입일</div>
          <div>{Moment(props.date_joined).format('YYYY-MM-DD')}</div>
        </div>
        <div>
          <div className={styles.contentTitle}>마지막 로그인</div>
          <div>{Moment(props.last_login).format('YYYY-MM-DD')}</div>
        </div>
      </div>

    </div>
    <div className={styles.btnBox}>
      <Link to="/change/profile/">프로필 변경</Link>
      <Link to="/change/password/">비밀번호 변경</Link>
    </div>
  </div>
);

Profile.propTypes = {
  pk: PropTypes.number,
  username:PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  propfile_image: PropTypes.string,
  date_joined: PropTypes.string,
  last_login: PropTypes.string,
}

export default Profile;
