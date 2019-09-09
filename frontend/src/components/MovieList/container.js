import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter, Link} from 'react-router-dom';
import queryString from 'query-string';
import MovieList from './presenter';
import Pagination from '../Common/pagination';
import styles from './movieList.module.css';

class Container extends Component {
  state = {
    loaded: false,
    inputSearch: ''
  };

  static propTypes = {
    isLogin: PropTypes.bool.isRequired,
    movie_list: PropTypes.arrayOf(
      PropTypes.shape({
        poster_image: PropTypes.string,
        title: PropTypes.string.isRequired,
        release: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
        actor: PropTypes.string.isRequired,
        average_grade: PropTypes.number,
        total_reviews: PropTypes.number,
        id: PropTypes.number.isRequired,
      })
    ),
    page_count: PropTypes.number,
    page_next: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    page_prev: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    getMovieList: PropTypes.func.isRequired,
  };

  componentDidMount = async() => {
    const pageInfo = queryString.parse(this.props.location.search);
    const {getMovieList} = this.props;

    const result = await getMovieList(pageInfo["page"], pageInfo["search"]);

    if(result === 'success'){
      this.setState({
        loaded: true
      });
    }else{
      /*
      if(result.detail){
        alert(result.detail);
      }else{
        alert('네트워크가 불안정합니다.');
      }
      */
    }
  }

  componentDidUpdate(prevProps, prevState){
    const {movie_list} = this.props;

    if(movie_list !== prevProps.movie_list){
      this.setState({
        loaded: true
      });
    }
  }

  handleInputChange = (event) => {
    const {target: {name, value}} = event;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    //const {inputSearch} = this.state;
    //const {getMovieList} = this.props;
    //this.props.history.push(`/?page=1&search=${inputSearch}`);

    /*
    this.setState({
      loaded: false
    });


    const result = await getMovieList(1, inputSearch);

    if(result !== 'success'){
      if(result.detail){
        alert(result.detail);
      }else{
        alert('네트워크가 불안정합니다.');
      }
    }
    */

    //this.props.history.replace(`/movies/?page=1&search=${inputSearch}`, '/movies/');

  }

  linkClick = async () => {
    const {getMovieList} = this.props;
    const {inputSearch} = this.state;

    const result = await getMovieList(1, inputSearch);
    if(result !== 'success'){
      if(result.detail){
        alert(result.detail);
      }else{
        alert('네트워크가 불안정합니다');
      }
    }
  }

  pageBtnClick = async (event) => {
    const {getMovieList} = this.props;
    const page = event.target.parentElement.dataset.page;
    const search = event.target.parentElement.dataset.search;
    const result = await getMovieList(page, search);
    if(result !== 'success'){
      if(result.detail){
        alert(result.detail);
      }else{
        alert('네트워크가 불안정합니다.');
      }
    }
  }

  render(){
    const {loaded, inputSearch} = this.state;
    if(!loaded){
        return <h3>로딩 중입니다.</h3>;
    }

    const {movie_list, page_count} = this.props;
    const page_info = queryString.parse(this.props.location.search);

    return (
      <div className={styles.container}>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="inputSearch" value={inputSearch} onChange={this.handleInputChange} />
          <Link to={inputSearch ? `/?page=1&search=${inputSearch}` : `/?page=1`} onClick={this.linkClick}>검색</Link>
        </form>
        {movie_list.map(movie => {
          return <MovieList {...movie} key={movie.id} />
        })}

        <Pagination
          page_count={page_count}
          page_info={page_info}
          pageBtnClick={this.pageBtnClick}
        />

      </div>
    );
  }


}

export default withRouter(Container);
