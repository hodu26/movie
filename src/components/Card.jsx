import React from 'react';
import 'styles/card.css';

const MovieCard = ({ movie }) => {
    return (
        <div className="movie-card">
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
    );
};

export default MovieCard;
