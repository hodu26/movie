import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieGrid from 'components/Popular/Grid_section';
import SignInUp from 'components/SignInUp/Body_signin_up';
import 'styles/Popular/body_popular.css';

const Popular = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false); // 로딩 상태
  const [isGrid, setIsGrid] = useState(true); // Grid <-> List
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(2);

  useEffect(() => {
    // 로그인 확인
    const savedTMDbKey = localStorage.getItem('TMDb-Key');

    if (!savedTMDbKey) {
      navigate('/signin');
    }
    else setIsLogin(true);

    // -----------------------------------------

    // 한페이지 영화 개수 계산
    const updateMoviesPerPage = () => {
      const windowWidth = window.innerWidth;

      if (windowWidth < 768) { // 모바일 (최대 4줄)
        setMoviesPerPage(Math.floor((windowWidth - 6 * 16) / (9.34 * 16)) * 4);
      }
      else { // 윈도우 (최대 3줄)
        setMoviesPerPage(Math.floor((windowWidth - 14 * 16) / (13.34 * 16)) * 3);
      }
    };

    // 화면 크기 변화 시 다시 계산하도록 이벤트 리스너 추가
    window.addEventListener('resize', updateMoviesPerPage);
    updateMoviesPerPage();

    // 컴포넌트가 unmount 될 때 리스너 제거
    return () => {
      window.removeEventListener('resize', updateMoviesPerPage);
    };
  }, [navigate])
  if (!isLogin) return <SignInUp />



  // 영화 데이터
  const movies = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    title: `Movie ${i + 1}`,
    image: require('assets/image/venom.jpg'),
    rating: (Math.random() * 5).toFixed(1),
  }));

  const totalPages = Math.ceil(movies.length / moviesPerPage);

  // 페이지 이동 핸들러
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  // 현재 페이지에 표시할 영화
  const currentMovies = movies.slice(
    (currentPage - 1) * moviesPerPage,
    currentPage * moviesPerPage
  );

  return (
    <div className="popular-container">
      {/* 영화 그리드 <-> 리스트 버튼 */}
      <div className="w-full p-4">
        <div className="grid-list">
          <button
            className="button button-grid"
            aria-label="Grid view"
            onClick={() => setIsGrid(true)}
          >
            <svg
              className="icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
          </button>

          <button
            className="button button-list"
            aria-label="List"
            onClick={() => setIsGrid(false)}
          >
            <svg
              className="icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
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

      {/* 영화 그리드 <-> 리스트 섹션 */}
      <div className='grid-list-container'>
        {isGrid ? (
          <MovieGrid movies={currentMovies} />
        ) : (
          <MovieGrid movies={currentMovies} />
        )}

        {/* 페이지네이션 */}
        <div className="pagination">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <span>{`${currentPage} / ${totalPages}`}</span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popular;
