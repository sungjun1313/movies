import React from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import MdMenu from 'react-ionicons/lib/MdMenu'//여기서 lifecycle 경고문 나타남

import styles from './header.module.css';


const Header = props => (
  <nav className={[styles.nav, props.isMobile && props.menuOpen && styles.bigNav].join(' ')}>
    <div className={styles.container}>
      <div className={styles.navLeft}>
        <Link to="/" onClick={props.menuClick}>로고</Link>

        <MdMenu className={styles.menuBtn} fontSize="40px" color="#ffffff" onClick={props.menuClick} />
      </div>

      {!props.isLogin && (
        <div className={styles.navRight}>
          <div className={styles.linkBox}>
            {/*<Link to="/login/" className={[styles.link, window.location.pathname === '/login/' && styles.active].join(' ')} onClick={props.menuClick}>로그인</Link>*/}
            <NavLink to="/login/" onClick={props.menuClick} name="login" current={props.location.pathname}>로그인</NavLink>
          </div>
          <div className={styles.linkBox}>
            <NavLink to="/register/" onClick={props.menuClick} name="register" current={props.location.pathname}>회원가입</NavLink>
          </div>
        </div>
      )}

      {props.isLogin && (
        <div className={styles.navRight}>
          <div className={styles.linkBox}>
            <NavLink to="/logout/" onClick={props.menuClick} name="logout">로그아웃</NavLink>
          </div>
          <div className={styles.linkBox}>
            <NavLink to="/profile/" onClick={props.menuClick} name="profile" current={props.location.pathname}>프로필</NavLink>
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

const NavLink = props => (
  <Link className={[styles.link, props.current === props.to && styles.active].join(' ')} {...props}>
    {props.children}
  </Link>
);


NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  current:PropTypes.string,
  onClick: PropTypes.func.isRequired
}


export default withRouter(Header);
