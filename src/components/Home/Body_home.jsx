import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from 'components/Home/Hero_section'
import MovieCategory from 'components/Home/Card_slide'
import SignInUp from 'components/SignInUp/Body_signin_up';
import 'styles/Home/body_home.css';

const Home = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false); // 로딩 상태

    // 로그인 확인
    useEffect(() => {
        const savedTMDbKey = localStorage.getItem('TMDb-Key');

        if (!savedTMDbKey) {
            navigate('/signin');
        }
        else setIsLogin(true);

    }, [navigate]);
    if (!isLogin) return <SignInUp />

    const movies = {
        popular: [
            { id: 1, original_title: 'Venom', poster_path: require('assets/image/venom.jpg'), vote_average: 4.5 },
            { id: 1, original_title: 'Venom', poster_path: require('assets/image/venom.jpg'), vote_average: 4.5 },
            { id: 1, original_title: 'Venom', poster_path: require('assets/image/venom.jpg'), vote_average: 4.5 },
            { id: 1, original_title: 'Venom', poster_path: require('assets/image/venom.jpg'), vote_average: 4.5 },
            { id: 1, original_title: 'Venom', poster_path: require('assets/image/venom.jpg'), vote_average: 4.5 },
            { id: 1, original_title: 'Venom', poster_path: require('assets/image/venom.jpg'), vote_average: 4.5 },
            { id: 1, original_title: 'Venom', poster_path: require('assets/image/venom.jpg'), vote_average: 4.5 },
            { id: 1, original_title: 'Venom', poster_path: require('assets/image/venom.jpg'), vote_average: 4.5 },
            { id: 1, original_title: 'Venom', poster_path: require('assets/image/venom.jpg'), vote_average: 4.5 },
            { id: 1, original_title: 'Venom', poster_path: require('assets/image/venom.jpg'), vote_average: 4.5 },
        ],
        latest: [
            { id: 1, original_title: 'Venom', poster_path: require('assets/image/venom.jpg'), vote_average: 4.5 },
            { id: 1, original_title: 'Venom', poster_path: require('assets/image/venom.jpg'), vote_average: 4.5 },
            { id: 1, original_title: 'Venom', poster_path: require('assets/image/venom.jpg'), vote_average: 4.5 },
            { id: 1, original_title: 'Venom', poster_path: require('assets/image/venom.jpg'), vote_average: 4.5 },
            { id: 1, original_title: 'Venom', poster_path: require('assets/image/venom.jpg'), vote_average: 4.5 },
            { id: 1, original_title: 'Venom', poster_path: require('assets/image/venom.jpg'), vote_average: 4.5 },
            { id: 1, original_title: 'Venom', poster_path: require('assets/image/venom.jpg'), vote_average: 4.5 },
        ],
        action: [
            { id: 1, original_title: 'Venom', poster_path: require('assets/image/venom.jpg'), vote_average: 4.5 },
            { id: 1, original_title: 'Venom', poster_path: require('assets/image/venom.jpg'), vote_average: 4.5 },
            { id: 1, original_title: 'Venom', poster_path: require('assets/image/venom.jpg'), vote_average: 4.5 },
            { id: 1, original_title: 'Venom', poster_path: require('assets/image/venom.jpg'), vote_average: 4.5 },
            { id: 1, original_title: 'Venom', poster_path: require('assets/image/venom.jpg'), vote_average: 4.5 },
            { id: 1, original_title: 'Venom', poster_path: require('assets/image/venom.jpg'), vote_average: 4.5 },
            { id: 1, original_title: 'Venom', poster_path: require('assets/image/venom.jpg'), vote_average: 4.5 },
            { id: 1, original_title: 'Venom', poster_path: require('assets/image/venom.jpg'), vote_average: 4.5 },
        ],
    };

    return (
        <div className="home-container">
            <HeroSection
                image={require('assets/image/venom.jpg')}
                title="베놈: 라스트 댄스"
                description="환상의 케미스트리의 액션 블록과 그의 심비오트 베놈은 그들을 노리는 정체불명 존재의 추격을 피해 최어드워을 다니게 된다..."
            />

            <MovieCategory title="인기 영화" movies={movies.popular} id="popular" />
            <MovieCategory title="최신 영화" movies={movies.latest} id="latest" />
            <MovieCategory title="액션 영화" movies={movies.action} id="action" />
        </div>
    );
};

export default Home;
