import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../styles/body_home.css'

const Home = () => {
    const movies = {
        popular: [
            { id: 1, title: 'Venom', image: require('../assets/image/venom.jpg'), rating: 4.5 },
            { id: 1, title: 'Venom', image: require('../assets/image/venom.jpg'), rating: 4.5 },
            { id: 1, title: 'Venom', image: require('../assets/image/venom.jpg'), rating: 4.5 },
            { id: 1, title: 'Venom', image: require('../assets/image/venom.jpg'), rating: 4.5 },
            { id: 1, title: 'Venom', image: require('../assets/image/venom.jpg'), rating: 4.5 },
            { id: 1, title: 'Venom', image: require('../assets/image/venom.jpg'), rating: 4.5 },
            { id: 1, title: 'Venom', image: require('../assets/image/venom.jpg'), rating: 4.5 },
        ],
        latest: [
            { id: 1, title: 'Venom', image: require('../assets/image/venom.jpg'), rating: 4.5 },
            { id: 1, title: 'Venom', image: require('../assets/image/venom.jpg'), rating: 4.5 },
            { id: 1, title: 'Venom', image: require('../assets/image/venom.jpg'), rating: 4.5 },
            { id: 1, title: 'Venom', image: require('../assets/image/venom.jpg'), rating: 4.5 },
            { id: 1, title: 'Venom', image: require('../assets/image/venom.jpg'), rating: 4.5 },
            { id: 1, title: 'Venom', image: require('../assets/image/venom.jpg'), rating: 4.5 },
            { id: 1, title: 'Venom', image: require('../assets/image/venom.jpg'), rating: 4.5 },
        ],
        action: [
            { id: 1, title: 'Venom', image: require('../assets/image/venom.jpg'), rating: 4.5 },
            { id: 1, title: 'Venom', image: require('../assets/image/venom.jpg'), rating: 4.5 },
            { id: 1, title: 'Venom', image: require('../assets/image/venom.jpg'), rating: 4.5 },
            { id: 1, title: 'Venom', image: require('../assets/image/venom.jpg'), rating: 4.5 },
            { id: 1, title: 'Venom', image: require('../assets/image/venom.jpg'), rating: 4.5 },
            { id: 1, title: 'Venom', image: require('../assets/image/venom.jpg'), rating: 4.5 },
            { id: 1, title: 'Venom', image: require('../assets/image/venom.jpg'), rating: 4.5 },
        ],
    };

    const MovieCategory = ({ title, movies, id }) => (
        <div className="movie-category">
            <h2 className="category-title">{title}</h2>
            <div className="scroll-container group">
                <button className="scroll-button scroll-left">
                    <ChevronLeft className="text-white" />
                </button>
                <div id={id} className="movie-scroll-area">
                    {movies.map((movie) => (
                        <div key={movie.id} className="movie-card">
                            <div className="card-image">
                                <img src={movie.image} alt={movie.title} />
                                <div className="card-overlay">
                                    <p className="movie-title">{movie.title}</p>
                                    <div className="rating">
                                        <span>★</span>
                                        <span>{movie.rating}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="scroll-button scroll-right">
                    <ChevronRight className="text-white" />
                </button>
            </div>
        </div>
    );

    return (
        <div className="home-container">
 
            <div className="hero-section">
                <img
                    src={require('../assets/image/venom.jpg')}
                    alt="Hero Banner"
                    className="hero-image"
                />
                <div className="hero-overlay">
                    <div className="hero-content">
                        <h1 className="hero-title">베놈: 라스트 댄스</h1>
                        <p className="hero-description">
                            환상의 케미스트리의 액션 블록과 그의 심비오트 베놈은 그들을 노리는
                            정체불명 존재의 추격을 피해 최어드워을 다니게 된다...
                        </p>
                        <div className="hero-buttons">
                            <button className="hero-button play-button">재생</button>
                            <button className="hero-button info-button">상세 정보</button>
                        </div>
                    </div>
                </div>
            </div>

            <MovieCategory title="인기 영화" movies={movies.popular} id="popular" />
            <MovieCategory title="최신 영화" movies={movies.latest} id="latest" />
            <MovieCategory title="액션 영화" movies={movies.action} id="action" />
        </div>
    );
};

export default Home;