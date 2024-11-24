import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Toast 스타일
import { TransitionGroup, CSSTransition } from 'react-transition-group'; // Transition 라이브러리

import Home from 'pages/Home';
import SignInUp from 'pages/SignInUp';
import Popular from 'pages/Popular';
import WishList from 'pages/WishList';
import Search from 'pages/Search';
import NotFound from 'pages/404NotFound';

function App() {
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
