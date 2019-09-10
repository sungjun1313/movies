import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Loading from '../Loading';
import MovieDetail from './presenter';
import styles from './movieDetail.module.css';
import noMovies from '../Images/noMovies.jpg';

class Container extends Component {
  state = {
    loaded: false,
    mine: false,
    createBody: '',
    createGrade: '',
    updateBody: '',
    updateGrade: '',
    isEditing: false,
  };

  static propTypes = {
    movie_detail: PropTypes.shape({
      id: PropTypes.number.isRequired,
      post_image: PropTypes.string,
      title: PropTypes.string,
      release: PropTypes.string,
      director: PropTypes.string,
      actor: PropTypes.string,
      story: PropTypes.string,
      average_grade: PropTypes.number,
      total_reviews: PropTypes.number,
      cinema_id: PropTypes.arrayOf(
        PropTypes.shape({
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
          modified: PropTypes.string
        })
      )
    }),
    getMovieDetail: PropTypes.func.isRequired,
    createReviewAction: PropTypes.func.isRequired,
    updateReviewAction: PropTypes.func.isRequired,
    deleteReviewAction: PropTypes.func.isRequired,
  };

  componentDidMount = async () => {
    const {getMovieDetail} = this.props;
    const id = this.props.match.params.id;
    const result = await getMovieDetail(id);
    if(result === 'success'){
      this.setState({
        loaded: true
      });
    }else{
      if(result.detail){
        alert(result.detail);
      }else{
        console.log('네트워크가 불안정합니다.');
      }
    }
  };

  componentDidUpdate(prevProps, prevState){
    const {movie_detail} = this.props;
    if(movie_detail !== prevProps.movie_detail){
      this.setState({
        loaded: true
      });
    }
  };

  findMine = () => {
    const {movie_detail: {cinema_reviews}} = this.props;
    const myReview = cinema_reviews.filter(review => review.isMine)[0];
    return myReview;
  };

  handleInputChange = (event) => {
    const {target: {name, value}} = event;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const {createBody, createGrade, updateBody, updateGrade} = this.state;
    const myReview = this.findMine();
    const cinema_id = this.props.match.params.id;

    if(event.target.name === 'createReview'){
      const {createReviewAction} = this.props;

      const result = await createReviewAction(cinema_id, createGrade, createBody);
      if(result === 'success'){
        alert('성공적으로 저장하였습니다.');
        this.setState({
          createGrade: '',
          createBody: ''
        });
      }else{
        alert(result);
      }

    }else{
      const {updateReviewAction} = this.props;

      const result = await updateReviewAction(myReview.id, cinema_id, updateGrade, updateBody);
      if(result === 'success'){
        alert('성공적으로 수정하였습니다.');
        this.setState({
          isEditing: false
        });
      }else{
        alert(result);
      }
    }
  };

  handleDelete = async (event) => {
    event.preventDefault();
    const myReview = this.findMine();
    const cinema_id = this.props.match.params.id;
    const {deleteReviewAction} = this.props;
    if(window.confirm('리뷰를 정말로 삭제하시겠습니까?')){
        const result = await deleteReviewAction(myReview.id, cinema_id);
        if(result === 'success'){
          alert('성공적으로 삭제하였습니다.');
        }else{
          alert(result);
        }
    }

  };

  changeMode = () => {

    const myReview = this.findMine();
    //console.log(myReview);
    this.setState(prevState => {
      const {isEditing} = prevState;
      return {
        isEditing: !isEditing,
        updateBody: myReview.body,
        updateGrade: myReview.grade
      };
    });
  };

  myReviewShow = () => {
    this.setState(prevState => {
      const mine = prevState.mine;
      return {
        mine: !mine
      };
    });

  }

  render(){
    const {loaded, mine, createBody, createGrade, isEditing, updateBody, updateGrade} = this.state;
    if(!loaded){
      return <Loading />
    }

    const {movie_detail} = this.props;
    let {cinema_reviews} = movie_detail;
    if(mine){
      cinema_reviews = cinema_reviews.filter(review => review.isMine);
    }

    //console.log(cinema_reviews);

    return (
      <div className={styles.container}>
        <div className={styles.movieBox}>
          {movie_detail.poster_image ? <img src={movie_detail.poster_image} alt="포스터이미지" /> : <img src={noMovies} alt="포스터이미지" /> }
          <div className={styles.movieContent}>
            <h3>{movie_detail.title}</h3>
            <div>개봉날짜 : {movie_detail.release}</div>
            <div>영화감독 : {movie_detail.director}</div>
            <div>주연배우 : {movie_detail.actor}</div>
            <div>영화평점 : {movie_detail.average_grade}</div>
            <div className={styles.storyBox}>내용</div>
            <div>{movie_detail.story}</div>
          </div>
        </div>

        <div className={styles.review_desc}>

          <span>총 평점 : {movie_detail.average_grade} /</span>
          <span>총 리뷰 : {movie_detail.total_reviews} 개</span>
          <br />
          <br />
          {mine
            ? <span style={{cursor:'pointer'}} onClick={this.myReviewShow}>모든 리뷰 보기</span>
            : <span style={{cursor:'pointer'}} onClick={this.myReviewShow}>내 리뷰만 보기</span>
          }

        </div>

        <form name="createReview" onSubmit={this.handleSubmit} className={styles.createReviewForm}>
          <textarea name="createBody" onChange={this.handleInputChange} required value={createBody} placeholder="후기를 적어주세요."></textarea>
          <select name='createGrade' onChange={this.handleInputChange} value={createGrade} required>
            <option value="">평점</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <input type="submit" value="리뷰쓰기" />
        </form>

        {cinema_reviews.map(review => {
          if(review.isMine){
            return <MovieDetail
                    key={review.id}
                    {...review}
                    isEditing={isEditing}
                    changeMode={this.changeMode}
                    updateBody={updateBody}
                    updateGrade={updateGrade}
                    handleInputChange={this.handleInputChange}
                    handleSubmit={this.handleSubmit}
                    handleDelete={this.handleDelete}
                    />;
          }else{
            return <MovieDetail key={review.id} {...review} />;
          }

        })}

      </div>
    );
  }

}

export default Container;
