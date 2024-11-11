import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/404Page.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">이 페이지는 존재하지 않는 페이지입니다.</p>
      <Link to="/" className="not-found-link">홈으로 돌아가기</Link>
      <p className="not-found-suggestion">* 다른 페이지 목록 *</p>
      <ul className="suggested-links">
        <li><Link to="/popular">대세 콘텐츠</Link></li>
        <li><Link to="/search">찾아보기</Link></li>
        <li><Link to="/wishlist">내가 찜한 콘텐츠</Link></li>
      </ul>
    </div>
  );
};

export default NotFound;