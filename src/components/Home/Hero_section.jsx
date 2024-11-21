import React, { useState, useEffect } from 'react';
import { fetchData } from 'utils/dataLoad';
import { API_URL, IMAGE_BASE_URL, savedTMDbKey } from 'components/config';
import 'styles/Home/hero_section.css';

const HeroSection = () => {
    const [movie, setMovie] = useState({});

    const getRandomMovie = (movies) => {
        if (!movies || movies.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * movies.length);
        return movies[randomIndex];
    };

    useEffect(() => {
        const fetchNowPlaying = async () => {
            const url = `${API_URL}/movie/now_playing?api_key=${savedTMDbKey}&language=ko-KR`;
            const data = await fetchData(url, "배너");

            const randomMovie = getRandomMovie(data.results);

            setMovie(randomMovie);
        }

        fetchNowPlaying();
    }, []) // 빈 배열로 설정하여 컴포넌트가 처음 렌더링될 때만 실행

    return (
        <div className="hero-section">
            <img
                src={ movie.poster_path !== null ? `${IMAGE_BASE_URL}/original${movie.poster_path}` : require('assets/image/no-poster-image.png') }
                alt="Hero Banner"
                className="hero-image"
            />
            <div className="hero-overlay">
                <div className="hero-content">
                    <h1 className="hero-title">{movie.title}</h1>
                    <p className="hero-description">{movie.overview}</p>
                    <div className="hero-buttons">
                        <button className="hero-button play-button">재생</button>
                        <button className="hero-button info-button">상세 정보</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
