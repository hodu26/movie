import React, { useEffect, useRef, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovies } from '../redux/slices/movieSlice';
import MovieCard from 'components/Card';
import LoadingSpinner from 'components/Loading';
import 'styles/grid_view.css';

const GridView = ({ tag, adult, search, selected_genres, release_dates, vote_averages }) => {
  // 영화 정보 불러오기
  const dispatch = useDispatch();
  const { movies, page, isLoading, totalPages } = useSelector((state) => state.movies);

  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const observerRef = useRef(null);
  const loadMoreTriggerRef = useRef(null);
  
  // 재로딩 될때 맨 위로 이동 및 초기화
  useEffect(() =>{
    scrollToTop();
  }, [tag, adult, search, selected_genres, release_dates, vote_averages]);

  // Intersection Observer 설정
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '100px',
      threshold: 0.1,
    };

    // 스크롤이 끝에 다다를시 추가 페이지 로드
    observerRef.current = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !isLoading && page < totalPages) {
        if (tag === 'popular') {
          dispatch(fetchMovies({ tag: tag, page: page+1 }));
        }
        else if (tag === 'search_filter') {
          dispatch(fetchMovies({ tag: tag, adult: adult, search: search, genres: selected_genres, release_dates: release_dates, vote_averages: vote_averages, page: page+1 }));
        }
      }
    }, options);

    if (loadMoreTriggerRef.current) {
      observerRef.current.observe(loadMoreTriggerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [dispatch, isLoading, page, totalPages, tag, adult, search, selected_genres, release_dates, vote_averages]);

  // Scroll to Top 기능
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  useEffect(() => {
    const handleScroll = () => setShowScrollToTop(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFavorite = () => {
    // updatedWishlist 업데이트 완료 후 dispatch 실행
    if (tag === 'wish_list') {
      // 비동기 실행을 보장하기 위해 Timeout 사용
      setTimeout(() => {
        dispatch(fetchMovies({ tag: tag, adult: adult }));
      }, 0);
    }
  };

  return (
    <div>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onChangeWishList={toggleFavorite} aspectRatio="4 / 5" />
        ))}
      </div>
      
      {isLoading && <LoadingSpinner />}
      
      {/* 로딩 트리거를 위한 숨겨진 div */}
      <div ref={loadMoreTriggerRef} style={{ height: '20px', margin: '20px 0' }} />
      
      {showScrollToTop && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <ChevronUp />
        </button>
      )}
    </div>
  );
};

export default GridView;