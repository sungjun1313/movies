import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import MdMenu from 'react-ionicons/lib/MdMenu'//여기서 lifecycle 경고문 나타남

import styles from './header.module.css';


const Header = props => (
  <nav className={[styles.nav, props.isMobile && props.menuOpen && styles.bigNav].join(' ')}>
    <div className={styles.container}>
      <div className={styles.navLeft}>
        로고

        <MdMenu className={styles.menuBtn} fontSize="40px" color="#ffffff" onClick={props.menuClick} />
      </div>

      {!props.isLogin && (
        <div className={styles.navRight}>
          <div className={styles.linkBox}>
            <Link to="/login/" className={styles.link} onClick={props.menuClick}>로그인</Link>
          </div>
          <div className={styles.linkBox}>
            <Link to="/register/" className={styles.link} onClick={props.menuClick}>회원가입</Link>
          </div>
        </div>
      )}

      {props.isLogin && (
        <div className={styles.navRight}>
          <div className={styles.linkBox}>
            <Link to="/logout/" className={styles.link} onClick={props.menuClick} name='logout'>로그아웃</Link>
          </div>
          <div className={styles.linkBox}>
            <Link to="/profile/" className={styles.link} onClick={props.menuClick}>프로필</Link>
          </div>
        </div>
      )}



    </div>
  </nav>
);

Header.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  isLogin: PropTypes.bool.isRequired,
  menuOpen: PropTypes.bool.isRequired,
  menuClick: PropTypes.func.isRequired,
}

export default Header;
