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
            <button
              className="scroll-button scroll-left"
            >
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
            <button
              className="scroll-button scroll-right"
            >
              <ChevronRight className="text-white" />
            </button>
          </div>
        </div>
      );

    return (
        <div className="home-container">
            <MovieCategory title="인기 영화" movies={movies.popular} id="popular" />
            <MovieCategory title="최신 영화" movies={movies.latest} id="latest" />
            <MovieCategory title="액션 영화" movies={movies.action} id="action" />
        </div>
    );
};

export default Home;