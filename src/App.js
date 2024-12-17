import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Toast 스타일
import { TransitionGroup, CSSTransition } from 'react-transition-group'; // Transition 라이브러리

import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { refreshAccessToken, logout } from './redux/slices/kakaoAuthSlice';

import Home from 'pages/Home';
import SignInUp from 'pages/SignInUp';
import KakaoCallback from 'pages/KakaoCallback';
import Popular from 'pages/Popular';
import WishList from 'pages/WishList';
import Search from 'pages/Search';
import NotFound from 'pages/404NotFound';

function App() {
  // kakao 토큰 확인 로직
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem('kakao_access_token');
    const expiryTime = localStorage.getItem('kakao_access_token_expiry');
    const currentTime = new Date().getTime();

    if (accessToken && expiryTime && currentTime < Number(expiryTime)) {
      const timeUntilExpiry = Number(expiryTime) - currentTime;

      // 만료될 시간까지 setTimeout 설정
      const timeoutId = setTimeout(() => {
        dispatch(refreshAccessToken()).catch(() => {
          // 갱신 실패 시 로그아웃 처리
          dispatch(logout());
          toast.error('세션이 만료되었습니다. 다시 로그인해주세요.');
        });
      }, timeUntilExpiry);

      // 컴포넌트 언마운트 시 setTimeout 정리
      return () => clearTimeout(timeoutId);
    }

    // 만료되지 않았다면 별도로 처리할 필요 없음
  }, [dispatch]);
  // --------------------

  console.log('Current Environment:', process.env.REACT_APP_NODE_ENV);

  return (
      <Router basename="/movie">
        <PageTransitions />

        {/* ToastContainer를 앱에 추가 */}
        <ToastContainer 
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false} // 오른쪽에서 왼쪽 정렬 (기본: 왼쪽에서 오른쪽)
          pauseOnFocusLoss // 포커스를 잃으면 일시 중지
          draggable
          pauseOnHover
          limit={3} // 최대 3개의 Toast만 표시
        />

      </Router>
  );
}

// PageTransitions 컴포넌트를 별도로 분리하여 useLocation과 Transition을 적용
function PageTransitions() {
  const location = useLocation(); // 현재 위치 정보

  return (
    <TransitionGroup component={null}>
      <CSSTransition
        key={location.pathname} // URL 경로를 key로 사용하여 트랜지션을 제어
        timeout={50} // 애니메이션 지속 시간
        classNames="fade"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignInUp />} />
          <Route path="/signin/oauth2/code/kakao" element={<KakaoCallback />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/search" element={<Search />} />
          <Route path="/wishlist" element={<WishList />} />

          {/* 404 페이지 */}
          <Route path="*" element={<NotFound />} />
        </Routes>

      </CSSTransition>
    </TransitionGroup>
  );
}

export default App;
