import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Toast 스타일

import Home from 'pages/Home';
import SignInUp from 'pages/SignInUp';
import Popular from 'pages/Popular';
import NotFound from 'pages/404NotFound';

function App() {
  return (
    <Router basename="/movie">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignInUp />} />
        <Route path="/popular" element={<Popular />} />

        {/* 404 페이지 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

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

export default App;
