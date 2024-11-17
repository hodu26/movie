import React, { useState } from 'react';
import { User, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import 'styles/header.css';

const Header = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const handleHome = () => navigate('/');

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    return (
        <>
            {/* 헤더 */}
            <header className="header">
                <div className="nav-container">
                    {/* 모바일용 햄버거 버튼 */}
                    <div className="menu-toggle md:hidden" onClick={toggleSidebar}>
                        <Menu className="text-white w-6 h-6" />
                    </div>
                    
                    {/* 로고 */}
                    <div className="logo" onClick={handleHome}>
                        <img src={process.env.PUBLIC_URL + '/logo.png'}/>
                    </div>

                    {/* <div className="logo" onClick={handleHome}>
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3 3h18v18H3V3zm16 16V5H5v14h14z" />
                        </svg>
                    </div> */}

                    {/* 내비게이션 (데스크톱용) */}
                    <nav className="navigation hidden md:flex">
                        <button onClick={handleHome}>홈</button>
                        <button>대세 콘텐츠</button>
                        <button>찾아보기</button>
                        <button>내가 찜한 리스트</button>
                    </nav>

                    {/* 유저 프로필 */}
                    <div className="user-profile">
                        <button>
                            <User className="w-6 h-6 text-white" />
                        </button>
                    </div>
                </div>
            </header>

            {/* 사이드바 */}
            <div
                className={`sidebar ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <button className="close-btn" onClick={toggleSidebar}>
                    닫기
                </button>
                
                <div className="sidebar-content">
                    <button onClick={() => { handleHome(); toggleSidebar(); }}>홈</button>
                    <button>대세 콘텐츠</button>
                    <button>찾아보기</button>
                    <button>내가 찜한 리스트</button>
                </div>
            </div>

            {/* 오버레이 */}
            {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
        </>
    );
};

export default Header;
