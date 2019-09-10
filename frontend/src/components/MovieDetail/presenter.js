import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import styles from './movieDetail.module.css';
import noPhoto from '../Images/noPhoto.jpg';

const MovieDetail = (props) => (
  <div className={styles.reviewBox}>
    <div className={styles.reviewLeft}>
      <div>
        {props.user.profile_image ? <img src={props.user.profile_image} alt="프로필사진" /> : <img src={noPhoto} alt="프로필사진" />}
      </div>
      <div>{props.user.username}</div>
    </div>

    <div className={styles.reviewRight}>
      <div>평점 : {props.grade} / {Moment(props.created).format('YYYY-MM-DD')}</div>
      {props.isEditing
        ?   (
              <div>
                <form name="updateReviewForm" onSubmit={props.handleSubmit} className={styles.updateReviewForm}>
                  <textarea name="updateBody" value={props.updateBody} onChange={props.handleInputChange} placeholder="후기를 적어주세요."></textarea>
                  <select name="updateGrade" value={props.updateGrade} onChange={props.handleInputChange}>
                    <option value=''>평점</option>
                    <option value='0'>0</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                  </select>
                  <div>
                    <input type="submit" value="저장" />
                    {props.isEditing && <button onClick={(e) => {e.preventDefault(); props.changeMode();} }>취소</button>}
                  </div>
                </form>
              </div>
            )
        :  (<div>{props.body}</div>)
      }

      {props.isMine
        ? props.isEditing
          ? (
              null
            )
          : (
              <div className={styles.btnBox}>
                <button onClick={props.changeMode}>수정</button>
                <button onClick={props.handleDelete}>삭제</button>
              </div>
            )
        : null
      }
    </div>

  </div>
);

MovieDetail.propTypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    profile_image: PropTypes.string,
    id: PropTypes.number.isRequired
  }),
  cinema: PropTypes.number,
  grade: PropTypes.number,
  body: PropTypes.string,
  isMine: PropTypes.bool.isRequired,
  created: PropTypes.string,
  modified: PropTypes.string,
  isEditing: PropTypes.bool,
  updateBody: PropTypes.string,
  updateGrade: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  changeMode: PropTypes.func,
  handleInputChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default MovieDetail;
