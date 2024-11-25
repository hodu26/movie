import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useAuthCheck from 'hooks/useAuthCheck';
import { fetchMovies } from '../../redux/slices/movieSlice';
import ButtonTableGrid from 'components/Button_tablegrid';
import MovieTable from 'components/Table_view';
import MovieGrid from 'components/Grid_view';
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
      dispatch(fetchMovies({ tag: 'popular', page: 1 }));
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
        <ButtonTableGrid isTable={isTable} setIsTable={setIsTable} />
      </div>

      {/* 영화 Grid <-> Table 섹션 */}
      <div className='view-container'>
      {isTable ? (
        <MovieTable tag='popular'/>
      ) : (
        <MovieGrid tag='popular'/>
      )}
      </div>
    </div>
  );
};

export default Popular;