import React from 'react';
import { User } from 'lucide-react';
import '../styles/header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <div className="logo">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 3h18v18H3V3zm16 16V5H5v14h14z" />
            </svg>
          </div>

          {/* Navigation */}
          <nav className="navigation">
            <a href="#">홈</a>
            <a href="#">대시 콘텐츠</a>
            <a href="#">찾아보기</a>
            <a href="#">내가 찜한 리스트</a>
          </nav>
        </div>

        {/* Right side - User profile */}
        <div className="user-profile">
          <button>
            <User className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
