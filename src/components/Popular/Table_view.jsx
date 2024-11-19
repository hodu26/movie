import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from 'components/Card';
import 'styles/Popular/table_view.css';

const TableView = ({ movies }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(24);

  useEffect(() => {
    // 한페이지 영화 개수 계산
    const updateMoviesPerPage = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight; // 화면 높이
      const containerGapHeight = 10.5 * 16; // 12.5rem - 2rem
      let movieWidth, movieHeight, containerGapWidth;

      if (windowWidth < 768) { // 모바일
        movieWidth = 10 * 16; // 8rem + 2rem
        movieHeight = 12 * 16; // 10rem + 2rem
        containerGapWidth = 4 * 16; // 6rem - 2rem
      }
      else { // 웹
        movieWidth = 14 * 16; // 12rem + 2rem
        movieHeight = 17 * 16; // 15rem + 2rem
        containerGapWidth = 12 * 16; // 14rem - 2rem
      }

      const maxColumns = Math.floor((windowWidth - containerGapWidth) / movieWidth);
      const maxRows = Math.floor((windowHeight - containerGapHeight) / movieHeight);

      setMoviesPerPage(maxColumns * maxRows);
    };

    // 화면 크기 변화 시 다시 계산하도록 이벤트 리스너 추가
    window.addEventListener('resize', updateMoviesPerPage);
    updateMoviesPerPage();

    // 컴포넌트가 unmount 될 때 리스너 제거
    return () => {
      window.removeEventListener('resize', updateMoviesPerPage);
    };
  })

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
    <div>
      <div className="movie-grid">
          {currentMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} aspectRatio="4 / 5" />
          ))}
      </div>

      {/* 페이지네이션 */}
      < div className="pagination" >
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
      </div >
    </div>
  );
};

export default TableView;