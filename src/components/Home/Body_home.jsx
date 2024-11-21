import React from 'react';
import { toast } from 'react-toastify';
import useAuthCheck from 'hooks/useAuthCheck';
import HeroSection from 'components/Home/Hero_section'
import MovieCategory from 'components/Home/Card_slide'
import LoadingSpinner from 'components/Loading';
import { useGenres } from 'hooks/genreLoad';
import 'styles/Home/body_home.css';

const Home = () => {
    // 장르 정보 불러오기
    const { genres, loading, error } = useGenres();

    // 로그인 확인
    const isLogin = useAuthCheck();
    if (!isLogin || loading) return <LoadingSpinner />
    if (error) return toast.error(`${error.message}`)

    // 액션 장르의 id 찾기
    const actionGenre = genres.find(genre => genre.name === '액션'); 
    const actionGenreId = actionGenre ? actionGenre.id : null;

    console.log(actionGenreId); // 액션 장르의 id 출력

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
