import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import useAuthCheck from 'hooks/useAuthCheck';
import { fetchGenres } from '../../redux/slices/genreSlice';
import { fetchMovies } from '../../redux/slices/movieSlice';
import DualRangeSlider from 'components/Search/Slider_dualRange';
import MovieTable from 'components/Table_view';
import LoadingSpinner from 'components/Loading';
import 'styles/Search/body_search.css';

const MovieSearchFilter = () => {
  // 장르 테이블, 영화 데이터 로드 및 로그인 확인
  const dispatch = useDispatch();
  const { genres, loading } = useSelector((state) => state.genres);
  const isLogin = useAuthCheck();

  // 필터
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [ratingRange, setRatingRange] = useState({ min: 0, max: 10 });
  const [includeAdult, setIncludeAdult] = useState(false);

  // 데이터 로드
  useEffect(() => {
    // 장르 테이블 로드
    if (isLogin && !loading) {
      dispatch(fetchGenres());
    }

    // 영화 데이터 로드
    if (isLogin) {
      dispatch(
        fetchMovies({
          tag: 'search_filter',
          search: searchQuery,
          adult: includeAdult,
          genres: selectedGenres,
          release_dates: dateRange,
          vote_averages: ratingRange,
          page: 1,
        })
      );
    }
  }, [dispatch, isLogin, loading, searchQuery, includeAdult, selectedGenres, dateRange, ratingRange]);

  if (!isLogin || loading) return <LoadingSpinner />;

  const handleGenreToggle = (genreId) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );

    console.log(selectedGenres);
  };

  return (
    <div className="movie-search-container">
      {/* 검색바 */}
      <div className="search-bar">
        <div className="search-input-container">
          <input
            type="text"
            placeholder="영화 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <Search className="search-icon" />
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="filter-button"
        >
          {isExpanded ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
          필터
        </button>
      </div>

      {/* 성인 콘텐츠 토글 - 간단한 버전 */}
      <div className="toggle-switch">
        <span className="toggle-switch__label">성인 콘텐츠 포함</span>
        <button
          onClick={() => setIncludeAdult(!includeAdult)}
          className={`toggle-switch__button ${includeAdult
              ? 'toggle-switch__button--active'
              : 'toggle-switch__button--inactive'
            }`}
        >
          <div
            className={`toggle-switch__handle ${includeAdult
                ? 'toggle-switch__handle--active'
                : 'toggle-switch__handle--inactive'
              }`}
          />
        </button>
      </div>

      {/* 확장된 필터 옵션 */}
      {isExpanded && (
        <div className="filter-options">

          {/* 장르 선택 */}
          <div>
            <h3 className="text-white mb-2">장르</h3>
            <div className="genre-filter">
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => handleGenreToggle(genre.id)}
                  className={`genre-button ${selectedGenres.includes(genre.id) ? 'selected' : ''
                    }`}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          </div>

          {/* 개봉일 범위 */}
          <div>
            <h3 className="text-white mb-2">개봉일</h3>
            <div className="date-range-filter">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) =>
                  setDateRange((prev) => ({ ...prev, start: e.target.value }))
                }
                className="date-input"
              />
              <span className="text-white self-center">~</span>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) =>
                  setDateRange((prev) => ({ ...prev, end: e.target.value }))
                }
                className="date-input"
              />
            </div>
          </div>

          {/* 평점 범위 */}
          <div>
            <h3 className="rating-range__header">평점 범위</h3>
            <div className="rating-range">
              <DualRangeSlider
                min={0}
                max={10}
                onChange={setRatingRange}
                className="rating-range__slider"
              />
              <div className="rating-range__values">
                <span>{ratingRange.min.toFixed(1)}</span>
                <span>{ratingRange.max.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 테이블 컨테이너 */}
      <div className="view-container">
        <MovieTable
          tag={searchQuery}
          adult={includeAdult}
          search={searchQuery}
          selected_genres={selectedGenres}
          release_dates={dateRange}
          vote_averages={ratingRange}
        />
      </div>
    </div>
  );
};

export default MovieSearchFilter;
