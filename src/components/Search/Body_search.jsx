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

  // 검색기록
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

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

  // 로컬스토리지에서 검색 기록 불러오기
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('user_data'))?.email?.search_history || [];
    setSearchHistory(savedHistory);
  }, []);

  // 포커스 아웃 시 검색 기록에 추가 및 로컬스토리지에 저장
  const handleBlur = () => {
    if (searchQuery.trim() !== '') {
      const newHistory = [searchQuery, ...searchHistory].slice(0, 3); // 최대 3개로 제한
      setSearchHistory(newHistory);
      localStorage.setItem('user_data', JSON.stringify({ email: { search_history: newHistory } }));
    }

    // 일정 시간 후 검색 기록 닫기
    setTimeout(() => {
      setShowHistory(false);
    }, 1000);  // 1000ms = 1초
  };

  // 검색 기록 클릭 시 검색어 설정
  const handleHistoryClick = (historyItem) => {
    setSearchQuery(historyItem);
    setShowHistory(false);
  };

  if (!isLogin || loading) return <LoadingSpinner />;

  const handleGenreToggle = (genreId) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
  };

  // 필터 초기화 함수
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedGenres([]);
    setDateRange({ start: '', end: '' });
    setRatingRange({ min: 0, max: 10 });
    setIncludeAdult(false);
  };

  return (
    <div className="movie-search-container">
      <div className='movie-search-sub-container'>
        {/* 검색바 */}
        <div className="search-bar">
          <div className="search-input-container">
            <input
              type="text"
              placeholder="영화 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowHistory(true)} // 검색창 포커스 시 검색 기록 보이기
              onBlur={handleBlur} // 포커스 아웃 시 로컬스토리지에 검색기록 추가
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

        {/* 검색 기록 */}
        {showHistory && searchHistory.length > 0 && (
          <div className="search-history">
            <ul>
              {searchHistory.map((historyItem, index) => (
                <li key={index} onClick={() => handleHistoryClick(historyItem)} className="history-item">
                  {historyItem}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="toggle-and-reset-container">
          {/* 전체 초기화 버튼 */}
          <button onClick={handleResetFilters} className="reset-button">
            전체 초기화
          </button>

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
        </div>

        {/* 확장된 필터 옵션 */}
        {isExpanded && (
          <div className="filter-options">

            {/* 장르 선택 */}
            <div>
              <h3 className="filter-category">장르</h3>
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
              <h3 className="filter-category">개봉일</h3>
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
            <div className='rating-container'>
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
      </div>

      {/* 테이블 컨테이너 */}
      <div className="view-container">
        <MovieTable
          tag="search_filter"
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
