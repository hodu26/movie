import React, { useEffect, useState, useRef } from 'react';
import MovieCard from 'components/Card';
import LoadingSpinner from 'components/Loading';
import 'styles/Popular/grid_view.css';

const GridView = ({ movies }) => {
  const [visibleMovies, setVisibleMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const observer = useRef(null);

  // 스크롤이 하단에 가까워지면 더 많은 영화를 불러오는 함수
  const loadMoreMovies = () => {
    if (isLoading) return;

    setIsLoading(true);
    setTimeout(() => {
      setVisibleMovies((prevMovies) => {
        const nextMovies = movies.slice(
          0,
          prevMovies.length + Math.floor(window.innerHeight / 200) * 4
        );
        return nextMovies;
      });
      setIsLoading(false);
    }, 1000);
  };

  // IntersectionObserver로 스크롤 이벤트 감지
  useEffect(() => {
    const loadMoreTrigger = document.querySelector('#load-more-trigger');

    if (!observer.current) {
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            loadMoreMovies();
          }
        },
        { threshold: 0.5 }
      );
    }

    if (loadMoreTrigger) {
      observer.current.observe(loadMoreTrigger);
    }

    return () => {
      if (loadMoreTrigger && observer.current) {
        observer.current.unobserve(loadMoreTrigger);
      }
    };
  }, []);

  // 페이지가 처음 로드될 때 최소 개수만큼 보여줌
  useEffect(() => {
    loadMoreMovies();
  }, [movies]);

  return (
    <div>
      <div className="movie-grid">
        {visibleMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} aspectRatio="4 / 5" />
        ))}
      </div>

      {isLoading && (
        <LoadingSpinner />
      )}

      {/* 로딩 트리거를 위한 숨겨진 div */}
      <div id="load-more-trigger" style={{ height: '1px' }} />
    </div>
  );
};

export default GridView;
