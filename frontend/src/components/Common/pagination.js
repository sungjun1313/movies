import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './common.module.css';

function range(start, end){
  return Array(end - start + 1).fill().map((_, idx) => start + idx);
};

const Pagination = (props) => {
  let list_len = 5; //django page list length
  if(Number.isInteger(Number(props.settings_list_len)) && props.settings_list_len > 0){
    list_len = props.settings_list_len;
  }

  let count = 0;//총 게시글 수
  if(Number.isInteger(Number(props.page_count)) && props.page_count > 0){
    count = props.page_count;
  }

  const queryPage = props.page_info['page'];
  const querySearch = props.page_info['search'];

  let current_page = 1;
  let num_btns = 5; //버튼 수
  if(Number.isInteger(Number(queryPage)) && queryPage > 0){
    current_page = queryPage;
  }

  if(Number.isInteger(Number(props.settings_num_btns)) && props.settings_num_btns > 0){
    num_btns = props.settings_num_btns;
  }

  const num_pages = count % list_len === 0 ? parseInt(count / list_len) : parseInt(count / list_len) + 1;//총 페이지 수
  const start_page = parseInt((current_page - 1) / num_btns) * num_btns + 1;//첫번째 버튼
  let end_page = start_page + num_btns - 1;//마지막 버튼
  if(end_page > num_pages){
    end_page = num_pages;
  }

  let previous = start_page - num_btns;//이전 버튼

  if(previous < 1){
    previous = 0;
  }

  let next = start_page + num_btns;//다음 버튼

  if(next> num_pages){
    next = 0;
  }

  const page_range = range(start_page, end_page);//최종 보여줄 버튼 리스트

  let search = '';

  if(typeof querySearch === 'string'){
    search = querySearch;
  }

  if(search){
    //console.log(search);
    return (
      <div className={styles.container}>
        <nav>
          <ul className={styles.btnBox}>
            {previous > 0
              && <li data-page={previous} data-search={search}><Link to={`?page=${previous}&search=${search}`} onClick={props.pageBtnClick}>&laquo;</Link></li>
            }

            {page_range.map(item => (
              item == current_page
              ? <li key={item} data-page={item} data-search={search}><Link to={`?page=${item}&search=${search}`} onClick={props.pageBtnClick} className={styles.active}>{item}</Link></li>
              : <li key={item}data-page={item} data-search={search}><Link to={`?page=${item}&search=${search}`} onClick={props.pageBtnClick}>{item}</Link></li>
            ))}

            {next > 0
              && <li data-page={next} data-search={search}><Link to={`?page=${next}&search=${search}`} onClick={props.pageBtnClick}>&raquo;</Link></li>
            }
          </ul>
        </nav>
      </div>
    );
  }else{
    //console.log(current_page);
    return (
      <div className={styles.container}>
        <nav>
          <ul className={styles.btnBox}>
            {previous > 0
              && <li data-page={previous}><Link to={`?page=${previous}`} onClick={props.pageBtnClick}>&laquo;</Link></li>
            }

            {page_range.map(item => (
              item == current_page
              ? <li key={item} data-page={item}><Link to={`?page=${item}`} onClick={props.pageBtnClick} className={styles.active}>{item}</Link></li>
              : <li key={item} data-page={item}><Link to={`?page=${item}`} onClick={props.pageBtnClick}>{item}</Link></li>
            ))}

            {next > 0
              && <li data-page={next}><Link to={`?page=${next}`} onClick={props.pageBtnClick}>&raquo;</Link></li>
            }
            </ul>
            </nav>
      </div>
    );
  }


}

Pagination.propTypes = {
  page_count: PropTypes.number,
  page_info: PropTypes.object,
  settings_list_len: PropTypes.number,
  settings_num_btns: PropTypes.number,
  pageBtnClick: PropTypes.func.isRequired
}

export default Pagination;
