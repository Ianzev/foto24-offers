import React from 'react'
import styles from '../pages.module.css'

const Pagination = ({ totalPosts, postPerPage, setCurrentPage, currentPage }) => {
    let pages = [];
    for (let i = 1; i <= Math.ceil(totalPosts/postPerPage); i++) {
      pages.push(i);
    }
  const handleClick = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <div className={styles['btn-pagination-container']}>
      {pages.map((page, index) => (
          <button className={`${styles["btn-paginations"]} ${page == currentPage ? styles.active : '' }`} onClick={() => handleClick(page)} key={index}>{page}</button>
      ))}
    </div>
  )
}

export default Pagination
