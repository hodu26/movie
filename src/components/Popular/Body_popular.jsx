import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieTable from 'components/Popular/Table_view';
import SignInUp from 'components/SignInUp/Body_signin_up';
import 'styles/Popular/body_popular.css';

const Popular = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false); // 로딩 상태
  const [isTable, setIsTable] = useState(true); // Table view <-> Scroll view

  useEffect(() => {
    // 로그인 확인
    const savedTMDbKey = localStorage.getItem('TMDb-Key');

    if (!savedTMDbKey) {
      navigate('/signin');
    }
    else setIsLogin(true);

  }, [navigate])
  if (!isLogin) return <SignInUp />

  // 영화 데이터
  const movies = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    title: `Movie ${i + 1}`,
    image: require('assets/image/venom.jpg'),
    rating: (Math.random() * 5).toFixed(1),
  }));

  return (
    <div className="popular-container">
      {/* 영화 Table <-> Ccroll 버튼 */}
      <div className="w-full p-4">
        <div className="view-toggle">
          <button
            className="button button-table"
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
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
          </button>

          <button
            className="button button-scroll"
            aria-label="Scroll"
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* 영화 Table <-> Scroll 섹션 */}
      <div className='view-container'>
        {isTable ? (
          <MovieTable movies={movies} />
        ) : (
          <MovieTable movies={movies} />
        )}
      </div>
    </div>
  );
};

export default Popular;
