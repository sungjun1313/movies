import React from 'react';
import PropTypes from 'prop-types';
import styles from './movieList.module.css';

import noMovies from '../Images/noMovies.jpg';

const MovieList = (props) => (
  <div className={styles.movieBox} onClick={props.movieBoxClick} name="box">
    {props.poster_image ? <img src={props.poster_image} alt="영화포스트" /> : <img src={noMovies} alt="영화포스타" />}
    <div>
      <h3>{props.title}</h3>
      <div>개봉날짜 : {props.release} </div>
      <div>영화감독 : {props.director}</div>
      <div>주연배우 : {props.actor}</div>
      <div>영화평점 : {props.average_grade}</div>
      <div>총리뷰수 : {props.total_reviews}</div>
    </div>
  </div>
);

MovieList.propTypes = {
  poster_image: PropTypes.string,
  title: PropTypes.string.isRequired,
  release: PropTypes.string.isRequired,
  director: PropTypes.string.isRequired,
  actor: PropTypes.string.isRequired,
  average_grade: PropTypes.number,
  total_reviews: PropTypes.number,
  id: PropTypes.number.isRequired,
  movieBoxClick: PropTypes.func.isRequired
};

export default MovieList;
