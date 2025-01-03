import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useAuthCheck from 'hooks/useAuthCheck';
import { fetchGenres } from '../../redux/slices/genreSlice';
import HeroSection from 'components/Home/Hero_section'
import MovieCategory from 'components/Home/Card_slide'
import LoadingSpinner from 'components/Loading';
import 'styles/Home/body_home.css';

const Home = () => {
    // 장르 정보 불러오기
    const dispatch = useDispatch();
    const { genres, loading } = useSelector((state) => state.genres);

    // 로그인 확인
    const isLogin = useAuthCheck();

    useEffect(() => {
        if (isLogin && !loading) {
            dispatch(fetchGenres());
        }
    }, [dispatch, isLogin, loading]);
    if (!isLogin || loading) return <LoadingSpinner />

    return (
        <div className="home-container">
            <HeroSection />

            <MovieCategory title="일간 인기 영화" tag="trending1" period="day" genres={genres} />
            <MovieCategory title="주간 인기 영화" tag="trending2" period="week" genres={genres} />
            <MovieCategory title="최신 영화" tag="now_playing" genres={genres} />
            <MovieCategory title="액션 영화" tag="액션" genres={genres} />
            <MovieCategory title="코미디 영화" tag="코미디" genres={genres} />
            <MovieCategory title="공포 영화" tag="공포" genres={genres} />
        </div>
    );
};

export default Home;
