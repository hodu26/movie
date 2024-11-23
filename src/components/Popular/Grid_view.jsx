import React, { useEffect, useRef, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPopularMovies } from '../../redux/movieSlice';
import MovieCard from 'components/Card';
import LoadingSpinner from 'components/Loading';
import 'styles/Popular/grid_view.css';

const GridView = () => {
  const dispatch = useDispatch();
  const { movies, page, isLoading, totalPages } = useSelector((state) => state.movies);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const observerRef = useRef(null);
  const loadMoreTriggerRef = useRef(null);

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
        dispatch(fetchPopularMovies(page + 1));
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
  }, [dispatch, isLoading, page, totalPages]);

  // Scroll to Top 기능
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  useEffect(() => {
    const handleScroll = () => setShowScrollToTop(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} aspectRatio="4 / 5" />
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