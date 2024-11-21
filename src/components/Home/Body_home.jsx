import React from 'react';
import useAuthCheck from 'hooks/useAuthCheck';
import { useGenres } from 'hooks/genreLoad';
import HeroSection from 'components/Home/Hero_section'
import MovieCategory from 'components/Home/Card_slide'
import LoadingSpinner from 'components/Loading';
import 'styles/Home/body_home.css';

const Home = () => {
    // 장르 정보 불러오기
    const { genres, loading } = useGenres();

    // 로그인 확인
    const isLogin = useAuthCheck();
    if (!isLogin || loading) return <LoadingSpinner />

    return (
        <div className="home-container">
            <HeroSection
                image={require('assets/image/venom.jpg')}
                title="베놈: 라스트 댄스"
                description="환상의 케미스트리의 액션 블록과 그의 심비오트 베놈은 그들을 노리는 정체불명 존재의 추격을 피해 최어드워을 다니게 된다..."
            />

            <MovieCategory title="인기 영화" tag="popular" genres={genres} />
            <MovieCategory title="최신 영화" tag="now_playing" genres={genres} />
            <MovieCategory title="액션 영화" tag="액션" genres={genres} />
        </div>
    );
};

export default Home;
