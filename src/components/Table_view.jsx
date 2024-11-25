import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, ThumbsUp, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { TbRating18Plus } from "react-icons/tb";
import { useSelector, useDispatch } from 'react-redux';
import { fetchGenres } from '../redux/slices/genreSlice';
import { fetchMovies } from '../redux/slices/movieSlice';
import { IMAGE_BASE_URL } from 'api/index';
import LoadingSpinner from 'components/Loading';
import 'styles/table_view.css';

const MovieTableView = ({ tag, adult, search, selected_genres, release_dates, vote_averages }) => {
  // 장르 정보 및 영화 정보 불러오기
  const dispatch = useDispatch();
  const { genres, loading } = useSelector((state) => state.genres);
  const { movies, page, isLoading, totalPages } = useSelector((state) => state.movies);

  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(24);
  const [sortColumn, setSortColumn] = useState('rank');
  const [sortDirection, setSortDirection] = useState('asc');

  const [currentPageInput, setCurrentPageInput] = useState(currentPage);

  const [isFavorite, setIsFavorite] = useState({});
  const [userEmail, setUserEmail] = useState(null);
  const [storedData, setStoredData] = useState({});

  // 초기 상태 로드
  useEffect(() => {
    dispatch(fetchGenres());

    setUserEmail(localStorage.getItem('email'));
    setStoredData(JSON.parse(localStorage.getItem('users_data')));

    // 위시리스트 초기화
    if (userEmail && storedData?.[userEmail]?.wishlist) {
      const wishlistMovieIds = storedData[userEmail]?.wishlist.map((movie) => movie.id);
      setIsFavorite((prevState) => ({
        ...prevState,
        ...wishlistMovieIds.reduce((acc, id) => {
          acc[id] = true; // 위시리스트에 있는 영화는 true로 설정
          return acc;
        }, {})
      }));
    }
  }, [dispatch, userEmail, storedData]);

  // 재로딩 될때 현재 페이지 첫 페이지로 초기화
  useEffect(() =>{
    setCurrentPage(1);
  }, [tag, adult, search, selected_genres, release_dates, vote_averages]);

  // 화면 크기 계산 및 화면에 로드할 영화 개수 지정
  useEffect(() => {
    const updateMoviesPerPage = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const containerGapHeight = 15 * 16; // 15rem
      const movieHeight = windowWidth < 768 ? 4.5 * 16 : 8.5 * 16; // 4.5rem : 8.5rem
      const maxRows = Math.floor((windowHeight - containerGapHeight) / movieHeight);
      setMoviesPerPage(maxRows);
    };

    window.addEventListener('resize', updateMoviesPerPage);
    updateMoviesPerPage();

    return () => {
      window.removeEventListener('resize', updateMoviesPerPage);
    };
  }, []);

  // 페이지 네이션 입력한 페이지로 전환
  useEffect(() => {
    setCurrentPageInput(currentPage);
  }, [currentPage]);

  const handlePageInputChange = (e) => {
    const inputValue = e.target.value;
    // 입력값이 숫자인지 확인하고 1보다 작으면 기본값 유지
    if (inputValue === '' || isNaN(inputValue)) { 
      setCurrentPage(''); // 빈 값으로 설정
    } else {
      setCurrentPage(Math.max(1, Math.min(Number(inputValue), endPages))); // 최소 1, 최대 페이지 제한
    }
  };
  if (loading) return <LoadingSpinner />

  const endPages = Math.ceil(movies.length / moviesPerPage);

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => { 
    setCurrentPage((prev) => Math.min(prev + 1, endPages));

    if (!isLoading && currentPage+1 === endPages && page < totalPages) {
      if (tag === 'popular') {
        dispatch(fetchMovies({ tag: tag, page: page+1 }));
      }
      else { // tag === 'search_filter'
        dispatch(fetchMovies({ tag: tag, adult: adult, search: search, genres: selected_genres, release_dates: release_dates, vote_averages: vote_averages, page: page+1 }));
      }
    }
  };

  // 정렬 기준 설정
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

  const sortedMovies = [...movies].sort((a, b) => {
    let compareA = a[sortColumn];
    let compareB = b[sortColumn];

    // null 값 처리
    if (compareA === null) compareA = '';
    if (compareB === null) compareB = '';

    if (sortDirection === 'asc') {
      return compareA > compareB ? 1 : -1;
    }
    return compareA < compareB ? 1 : -1;
  });

  const currentMovies = sortedMovies.slice(
    (currentPage - 1) * moviesPerPage,
    currentPage * moviesPerPage
  );

  // 로컬 스토리지에 위시리스트 데이터 저장
  const updateLocalStorage = (updatedWishlist) => {
    const updatedUserData = {
        ...storedData,
        [userEmail]: {
            ...storedData[userEmail],
            wishlist: updatedWishlist,
        },
    };
    localStorage.setItem('users_data', JSON.stringify(updatedUserData));
  };

  const toggleFavorite = (movie) => {
    const userWishlist = storedData[userEmail]?.wishlist || [];

    let updatedWishlist;
    if (isFavorite[movie.id]) {
      // Remove movie from wishlist
      updatedWishlist = userWishlist.filter((wishlistMovie) => wishlistMovie.id !== movie.id);
    } else {
      // Add movie to wishlist
      updatedWishlist = [...userWishlist, movie];
    }

    updateLocalStorage(updatedWishlist);
    setIsFavorite((prevState) => ({
      ...prevState,
      [movie.id]: !prevState[movie.id] // 현재 상태 반전
    }));
  };

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
                      {column.key !== 'favorite' && <SortIcon column={column.key} />}
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
                      {movie.adult && <TbRating18Plus className="adult-icon" />}
                      <img 
                        src={movie.poster_path ? `${IMAGE_BASE_URL}/original${movie.poster_path}` : require('assets/image/no-poster-image.png')}
                        alt={movie.original_title}
                      />
                    </div>
                  </td>
                  <td className="table-data">
                    <div className="table-movie-title">
                      <span className="title">{movie.title}</span>
                      <span className="description">{movie.overview}</span>
                      <span className="description">...</span>
                    </div>
                  </td>
                  <td className="table-data">
                    <div className="genres-container">
                      {movie.genre_ids.map((genre_id) => {
                        const genre = genres.find((g) => g.id === genre_id);
                        return genre ? (
                          <span key={genre_id} className="genre-tag">
                            {genre.name}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </td>
                  <td className="table-data">{movie.release_date}</td>
                  <td className="table-data">
                    <div className="vote-wrapper">
                      <ThumbsUp className="thumbs-icon" />
                      <span>{movie.vote_average}</span>
                    </div>
                  </td>
                  <td className="table-data">
                    <button className="favorite-button" onClick={() => toggleFavorite(movie)}>
                      <Star
                        className='star-icon'
                        fill={isFavorite[movie.id] ? '#facc15' : 'none'}
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

        <div className="pagination">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <span className="pagination-input">
          <input
            type="text"
            value={currentPageInput}
            onChange={handlePageInputChange}
            onBlur={() => {
              const newPage = Math.max(1, Math.min(endPages, currentPageInput)); // 1과 endPages 사이로 제한
              setCurrentPage(newPage);
              setCurrentPageInput(newPage);
            }}
            className="page-input"
          />
          <span>{`/ ${endPages}`}</span>
        </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === endPages}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieTableView;