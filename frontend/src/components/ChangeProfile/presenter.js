import React from 'react';
import PropTypes from 'prop-types';
import styles from './changeProfile.module.css';

const ChangeProfile = (props) => (
  <div className={styles.container}>
    <h3 className={styles.headerStyle}>프로필 변경</h3>
    <form onSubmit={props.handleSubmit}>
      <input className={styles.inputStyle} type="text" placeholder="이름" onChange={props.handleInputChange} name="name" value={props.name} required />
      <input className={styles.inputStyle} type="email" placeholder="이메일" onChange={props.handleInputChange} name="email" value={props.email} required />
      <input className={styles.inputStyle} type="file" placeholder="프로필 사진" onChange={props.handleInputChange} name="profile_image" />
      {props.show_image
        ? <div className={styles.circle}><img src={props.show_image} className={styles.imageStyle} alt="프로필 사진" /></div>
        : props.profile_image && <div style={{textAlign: 'right'}}>
                                    <div className={styles.circle}>
                                      <img src={props.profile_image} className={styles.imageStyle} alt="프로필 사진" />
                                    </div>
                                    <input type="checkbox" value="y" name="delete_image" onChange={props.handleInputChange} />삭제
                                  </div>
      }
      <input className={styles.btnStyle} type="submit" value="변경" />
    </form>
  </div>
);

ChangeProfile.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  profile_image: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  delete_image: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
}

export default ChangeProfile
