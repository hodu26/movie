import React, { useEffect, useState, useRef, useCallback } from 'react';
import MovieCard from 'components/Card';
import LoadingSpinner from 'components/Loading';
import 'styles/Popular/grid_view.css';

const GridView = ({ movies }) => {
  const [moviesPerPage, setMoviesPerPage] = useState(0);
  const [isReady, setIsReady] = useState(false); // 계산 완료 플래그
  const [visibleMovies, setVisibleMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const observer = useRef(null);

  // 한페이지 영화 개수 계산
  const updateMoviesPerPage = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight; // 화면 높이
    const containerGapHeight = 6 * 16; // 9rem - 1rem
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
    setIsReady(true); // 계산 완료 플래그 설정
  };

  useEffect(() => {
    const handleResize = () => {
      setIsReady(false); // 리사이즈 중 상태
      updateMoviesPerPage();
    };

    // 화면 크기 변화 시 다시 계산하도록 이벤트 리스너 추가
    window.addEventListener('resize', handleResize);

    if (moviesPerPage === 0) {
      updateMoviesPerPage(); // 초기 화면 크기 계산
    }

    // 컴포넌트가 unmount 될 때 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [moviesPerPage]);

  // 스크롤이 하단에 가까워지면 더 많은 영화를 불러오는 함수
  // useCallback을 사용하여 loadMoreMovies를 메모이제이션
  const loadMoreMovies = useCallback(() => {
    if (isLoading || !movies.length) return;

    setIsLoading(true);
    setTimeout(() => {
      setVisibleMovies((prevMovies) => {
        const nextMovies = movies.slice(0, prevMovies.length + moviesPerPage);
        return nextMovies;
      });
      setIsLoading(false);
      console.log(moviesPerPage)
    }, 1000);  // 딜레이를 두어 로딩 상태 효과 주기
  }, [isLoading, movies, moviesPerPage]); // isLoading과 movies가 변경될 때마다 loadMoreMovies가 다시 정의됨

  // IntersectionObserver로 스크롤 이벤트 감지
  useEffect(() => {
    if (!isReady) return; // 준비 상태가 아니면 실행하지 않음

    const loadMoreTrigger = document.querySelector('#load-more-trigger');

    if (!observer.current) {
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !isLoading) {
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
  }, [isReady, isLoading, loadMoreMovies]);

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
