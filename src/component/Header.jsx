import React from 'react';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/header.css';

const Header = () => {
    const navigate = useNavigate();

    const handleHome = (e) => {
        e.preventDefault();
        navigate('/');
        console.log("홈.");
    };

    return (
        <header className="header">
            <div className="container">
                <div className="flex items-center space-x-8">
                    {/* Logo */}
                    <div className="logo" onClick={handleHome}>
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3 3h18v18H3V3zm16 16V5H5v14h14z" />
                        </svg>
                    </div>

                    {/* Navigation */}
                    <nav className="navigation">
                        <button onClick={handleHome}>홈</button>
                        <button>대시 콘텐츠</button>
                        <button>찾아보기</button>
                        <button>내가 찜한 리스트</button>
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
