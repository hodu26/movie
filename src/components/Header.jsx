import React, { useState, useEffect } from 'react';
import { User, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetMovies } from '../redux/slices/movieSlice';
import { toast } from 'react-toastify';
import 'styles/header.css';

const Header = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const handleHome = () => { dispatch(resetMovies()); navigate('/'); }
    const handlePopular = () => { dispatch(resetMovies()); navigate('/popular'); }
    const handleSearch = () => { dispatch(resetMovies()); navigate('/search'); }
    const handleWishlist = () => { dispatch(resetMovies()); navigate('/wishlist'); }

    const handleProfile = () => { // 로그아웃
        // TMDb-Key 삭제 로직
        if (isLoggedIn){
            const savedRememberMe = localStorage.getItem('rememberMe') === 'true';

            if (!savedRememberMe){
                localStorage.removeItem('email');
            }
            
            localStorage.removeItem('TMDb-Key');
            
            // Kakao 관련 토큰 삭제
            const kakaoAccessToken = localStorage.getItem('kakao_access_token');
            const kakaoRefreshToken = localStorage.getItem('kakao_refresh_token');

            if (kakaoAccessToken || kakaoRefreshToken) {
                localStorage.removeItem('kakao_access_token');
                localStorage.removeItem('kakao_refresh_token');
                localStorage.removeItem('kakao_access_token_expiry');
                localStorage.removeItem('nickname');

                // 카카오 로그아웃 처리
                if (window.Kakao && window.Kakao.Auth) {
                    window.Kakao.Auth.logout(() => {
                        console.log('Kakao 로그아웃 완료');
                    });
                }
            }

            // 알림 및 리다이렉트
            setIsLoggedIn((prevState) => !prevState);
            toast.success('로그아웃 되었습니다.');
        }

        navigate('/signin');
    }

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    // 로컬스토리지에서 데이터 로드
    useEffect(() => {
        const savedEmail = localStorage.getItem('email');
        const savedNickname = localStorage.getItem('nickname');
        const savedTMDbKey = localStorage.getItem('TMDb-Key');

        if (savedTMDbKey) setIsLoggedIn(true);

        setEmail(savedEmail);
        setNickname(savedNickname || '');
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
                            {/* 로그인 상태일 시 초록, 로그아웃 상태일 시 빨강 처리 */}
                            <User
                                className="w-6 h-6"
                                color={isLoggedIn ? 'rgba(16, 185, 129, 0.8)' : 'rgba(239, 68, 68, 0.8)'}
                            />
                        </button>
                        {/* 카카오 로그인 시 닉네임 표시 */}
                        {nickname && <div className='user-nickname'>{nickname}</div>}
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
