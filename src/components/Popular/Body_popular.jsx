import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieTable from 'components/Popular/Table_view';
import MovieGrid from 'components/Popular/Grid_view';
import SignInUp from 'components/SignInUp/Body_signin_up';
import 'styles/Popular/body_popular.css';

const Popular = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false); // 로그인 상태
  const [isTable, setIsTable] = useState(null); // Table view <-> Grid view

  // isTable 값이 변경될 때 로컬 스토리지에 저장
  useEffect(() => {
    if (isTable !== null) {
      localStorage.setItem('isTable', JSON.stringify(isTable));
    }
  }, [isTable]);

  useEffect(() => {
    // 로그인 확인
    const savedTMDbKey = localStorage.getItem('TMDb-Key');

    if (!savedTMDbKey) {
      navigate('/signin');
    }
    else setIsLogin(true);

    // 로컬 스토리지에서 isTable 값을 가져와 초기화
    const savedView = localStorage.getItem('isTable');

    if (savedView !== null) {
      setIsTable(JSON.parse(savedView));
    } 
    else {
      setIsTable(false);
    }
    
  }, [navigate])
  if (!isLogin) return <SignInUp />

  // 영화 데이터
  const movies = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    rank: i + 1,
    original_title: `Movie ${i + 1}`,
    poster_path: require('assets/image/venom.jpg'),
    genre_ids: ['액션', "SF"],
    release_date: "2024-10-22",
    overview: "환상의 케미스트리의 액션 블록과 그의 심비오트 베놈은 그들을 노리는 정체불명 존재의 추격을 피해 최어드워을 다니게 된다...",
    vote_average: (Math.random() * 5).toFixed(1),
    adult: true,
  }));

  return (
    <div className="popular-container">
      {/* 영화 Grid <-> Table 버튼 */}
      <div className="w-full p-4">
        <div className="view-toggle">
          <button
            className={`button ${isTable ? 'button-unselected' : 'button-selected'}`}
            aria-label="Grid view"
            onClick={() => setIsTable(false)}
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
            className={`button ${isTable ? 'button-selected' : 'button-unselected'}`}
            aria-label="Table view"
            onClick={() => setIsTable(true)}
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

      {/* 영화 Grid <-> Table 섹션 */}
      <div className='view-container'>
        {isTable ? (
          <MovieTable movies={movies} />
        ) : (
          <MovieGrid movies={movies} />
        )}
      </div>
    </div>
  );
};

export default Popular;
