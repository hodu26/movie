import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, ThumbsUp, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { TbRating18Plus } from "react-icons/tb";
import 'styles/Popular/table_view.css';

const MovieTableView = ({ movies }) => {
  const [currentPage, setCurrentPage] = useState(1);
	const [moviesPerPage, setMoviesPerPage] = useState(24);
  const [sortColumn, setSortColumn] = useState('rank');
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    // 한페이지 영화 개수 계산
    const updateMoviesPerPage = () => {
			const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight; // 화면 높이
      const containerGapHeight = 15 * 16; // 15rem
      let movieHeight;

      if (windowWidth < 768) { // 모바일
        movieHeight = 4.5 * 16; // 4.5rem
      }
      else { // 웹
        movieHeight = 8 * 16; // 8rem
      }

      const maxRows = Math.floor((windowHeight - containerGapHeight) / movieHeight);

      setMoviesPerPage(maxRows);
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

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const SortIcon = ({ column }) => {
    if (sortColumn !== column) return <ChevronDown className="w-4 h-4 opacity-20" />;
    return sortDirection === 'asc' ? 
      <ChevronUp className="w-4 h-4" /> : 
      <ChevronDown className="w-4 h-4" />;
  };

	// 정렬된 데이터 계산
  const sortedMovies = [...movies].sort((a, b) => {
    if (sortDirection === 'asc') {
      return a[sortColumn] > b[sortColumn] ? 1 : -1;
    }
    return a[sortColumn] < b[sortColumn] ? 1 : -1;
  });

  // 현재 페이지에 표시할 영화
  const currentMovies = sortedMovies.slice(
    (currentPage - 1) * moviesPerPage,
    currentPage * moviesPerPage
  );

  return (
    <div className="movie-table-view-container">
      <div className="movie-table-wrapper">
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr className="table-header-row">
                {[
                  { key: 'rank', label: '순위' },
                  { key: 'poster_path', label: '포스터' },
                  { key: 'original_title', label: '제목 (설명)' },
                  { key: 'genre_ids', label: '장르' },
                  { key: 'release_date', label: '개봉일' },
                  { key: 'vote_average', label: '평점' },
                  { key: 'favorite', label: '즐겨찾기' }
                ].map((column) => (
                  <th
                    key={column.key}
                    className="table-header"
                    onClick={() => column.key !== 'favorite' && handleSort(column.key)}
                  >
                    <div className="flex items-center">
                      <span>{column.label}</span>
                      {column.key !== 'favorite' && (
                        <SortIcon column={column.key} />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentMovies.map((movie) => (
                <tr key={movie.id} className="table-body-row">
                  <td className="table-data">{movie.rank}</td>
                  <td className="table-data">
                    <div className="movie-poster">
                      {movie.adult && (
                          <TbRating18Plus className="adult-icon" />
                      )}
                      <img src={movie.poster_path} alt={movie.original_title} />
                    </div>
                  </td>
                  <td className="table-data">
                    <div className="table-movie-title">
                      <span className="title">{movie.original_title}</span>
                      <span className="description">{movie.overview}</span>
											<span className="description">...</span>
                    </div>
                  </td>
                  <td className="table-data">{movie.genre_ids}</td>
                  <td className="table-data">{movie.release_date}</td>
                  <td className="table-data">
                    <div className="vote-wrapper">
                      <ThumbsUp className="thumbs-icon" />
                      <span>{movie.vote_average}</span>
                    </div>
                  </td>
                  <td className="table-data">
                    <button className="favorite-button">
                      <Star className='star-icon'
                        fill={false ? '#facc15' : 'none'}
                        stroke="#facc15"
                        strokeWidth="1.5"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
				<div className="pagination" >
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
    </div>
  );
};

export default MovieTableView;