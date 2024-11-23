import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useAuthCheck from 'hooks/useAuthCheck';
import { fetchPopularMovies } from '../../redux/movieSlice';
import MovieTable from 'components/Popular/Table_view';
import MovieGrid from 'components/Popular/Grid_view';
import LoadingSpinner from 'components/Loading';
import 'styles/Popular/body_popular.css';

const Popular = () => {
  const dispatch = useDispatch();
  const { movies, isLoading } = useSelector((state) => state.movies);
  const [isTable, setIsTable] = useState(null);
  const isLogin = useAuthCheck();

  // 초기 데이터 로드
  useEffect(() => {
    if (isLogin && !isLoading && movies.length === 0) {
      dispatch(fetchPopularMovies(1));
    }
  }, [dispatch, isLogin, isLoading, movies.length]);

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

  if (!isLogin) return <LoadingSpinner />;

  return (
    <div className="popular-container">

       {/* 영화 Grid <-> Table 버튼 */}
      <div className="w-full p-4">
        <div className="view-toggle">
          <button
            className={`button ${isTable ? 'button-unselected' : 'button-selected'}`}
            aria-label="Grid view"
            onClick={() => setIsTable(false)}
          >
            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
          </button>
          <button
            className={`button ${isTable ? 'button-selected' : 'button-unselected'}`}
            aria-label="Table view"
            onClick={() => setIsTable(true)}
          >
            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* 영화 Grid <-> Table 섹션 */}
      <div className='view-container'>
      {isTable ? (
        <MovieTable movies={movies} />
      ) : (
        <MovieGrid />
      )}
      </div>
    </div>
  );
};

export default Popular;