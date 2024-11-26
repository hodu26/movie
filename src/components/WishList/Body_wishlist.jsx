import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useAuthCheck from 'hooks/useAuthCheck';
import { fetchMovies } from '../../redux/slices/movieSlice';
import ButtonTableGrid from 'components/Button_tablegrid';
import MovieTable from 'components/Table_view';
import MovieGrid from 'components/Grid_view';
import LoadingSpinner from 'components/Loading';
import 'styles/WishList/body_wishlist.css';

const MovieSearchFilter = () => {
  // 로그인 확인
  const dispatch = useDispatch();
  const isLogin = useAuthCheck();
  const [isTable, setIsTable] = useState(null);
  const [allowAdult, setAllowAdult] = useState(false);

  const { movies, isLoading } = useSelector((state) => state.movies);

  // 데이터 로드
  useEffect(() => {
    // 영화 데이터 로드
    if (isLogin) {
      dispatch(
        fetchMovies({ tag: 'wish_list', adult: allowAdult })
      );
    }
  }, [dispatch, isLogin, allowAdult]);

  // 뷰 상태 관리
  useEffect(() => {
    if (isTable !== null) {
      localStorage.setItem('isTable', JSON.stringify(isTable));
    }
  }, [isTable]);

  useEffect(() => {
    if (!isLogin) return;
    const savedView = localStorage.getItem('isTable');
    if (savedView !== null) {
      setIsTable(JSON.parse(savedView));
    } else {
      setIsTable(false);
    }
  }, [isLogin]);

  if (!isLogin || isLoading) return <LoadingSpinner />;

  const clearWishList = () => {
    const userEmail = localStorage.getItem('email');
    const storedData = JSON.parse(localStorage.getItem('users_data'));
    
    const updatedUserData = {
      ...storedData,
      [userEmail]: {
          ...storedData[userEmail],
          wishlist: [],
      },
    };
    localStorage.setItem('users_data', JSON.stringify(updatedUserData));

    // 페이지 리로딩
    dispatch(fetchMovies({ tag: 'wish_list', adult: allowAdult }));
  }

  return (
    <div className="movie-wishlist-container">
      <div className='movie-wishlist-sub-container'>
        <div className="movie-wishlist-toggle-and-reset-container">
          {/* 전체 삭제 버튼 */}
          <button 
            onClick={() => clearWishList()}
            className="movie-wishlist-reset-button"
          >
            전체 삭제
          </button>

          {/* 영화 Grid <-> Table 버튼 */}
          <ButtonTableGrid isTable={isTable} setIsTable={setIsTable} />

          {/* 성인 콘텐츠 토글 - 간단한 버전 */}
          <div className="movie-wishlist-toggle-switch">
            <span className="movie-wishlist-toggle-switch__label">성인 콘텐츠 포함</span>
            <button
              onClick={() => setAllowAdult(!allowAdult)}
              className={`movie-wishlist-toggle-switch__button ${allowAdult
                ? 'movie-wishlist-toggle-switch__button--active'
                : 'movie-wishlist-toggle-switch__button--inactive'
                }`}
            >
              <div
                className={`movie-wishlist-toggle-switch__handle ${allowAdult
                  ? 'movie-wishlist-toggle-switch__handle--active'
                  : 'movie-wishlist-toggle-switch__handle--inactive'
                  }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* 테이블 컨테이너 */}
      <div className="min-w-full h-full">
        {movies.length === 0 ? (
          <h1 className='text-center text-[#009eb3]'> 저장된 위시리스트가 없습니다 </h1>
        ) : ( 
          <div className="movie-wishlist-view-container">
            {isTable ? (
              <MovieTable
                tag="wish_list"
                adult={allowAdult}
              />
            ) : (
              <MovieGrid
                tag="wish_list"
                adult={allowAdult}
              />
            )}
            </div>
          )}
      </div>
    </div>
  );
};

export default MovieSearchFilter;
