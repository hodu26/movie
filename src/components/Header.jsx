import React, { useState, useEffect } from 'react';
import { User, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'styles/header.css';

const Header = () => {
    const [email, setEmail] = useState('');
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const handleHome = () => navigate('/');
    const handlePopular = () => navigate('/popular');
    const handleSearch = () => navigate('/search');
    const handleWishlist = () => navigate('/wishlist');

    const handleProfile = () => { // 로그아웃
        const savedTMDbKey = localStorage.getItem('TMDb-Key');

        if (savedTMDbKey){
            const savedRememberMe = localStorage.getItem('rememberMe') === 'true';

            if (!savedRememberMe){
                localStorage.removeItem('email');
            }
            
            localStorage.removeItem('TMDb-Key');
            toast.success('로그아웃 되었습니다.');
        }
        
        navigate('/signin');
    }

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    // 로컬스토리지에서 데이터 로드
    useEffect(() => {
        const savedEmail = localStorage.getItem('email');

        setEmail(savedEmail);
    }, []);

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
                        <img src={process.env.PUBLIC_URL + '/logo.png'} alt="Movie Action logo" />
                    </div>

                    {/* 내비게이션 (데스크톱용) */}
                    <nav className="navigation hidden md:flex">
                        <button onClick={handleHome}>홈</button>
                        <button onClick={handlePopular}>대세 콘텐츠</button>
                        <button onClick={handleSearch}>찾아보기</button>
                        <button onClick={handleWishlist}>내가 찜한 리스트</button>
                    </nav>

                    {/* 유저 프로필 */}
                    <div className="user-profile">
                        <span className='user-email'>{email}</span>
                        <button onClick={handleProfile}>
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
                    <button onClick={() => { handlePopular(); toggleSidebar(); }}>대세 콘텐츠</button>
                    <button onClick={() => { handleSearch(); toggleSidebar(); }}>찾아보기</button>
                    <button onClick={() => { handleWishlist(); toggleSidebar(); }}>내가 찜한 리스트</button>
                </div>
            </div>

            {/* 오버레이 */}
            {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
        </>
    );
};

export default Header;
