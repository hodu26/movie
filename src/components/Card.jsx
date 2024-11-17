import React, { useState } from 'react';
import { Star, ThumbsUp } from 'lucide-react';
import 'styles/card.css';

const MovieCard = ({ movie, aspectRatio }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <div className="movie-card">
            <div className="card-image" style={{aspectRatio: aspectRatio}}>
                <div className="favorite-icon" onClick={toggleFavorite}>
                    <Star
                        fill={isFavorite ? '#facc15' : 'none'}
                        stroke="#facc15"
                        strokeWidth="1.5"
                    />
                </div>
                <img src={movie.image} alt={movie.title} />
                <div className="card-overlay">
                    <p className="movie-title">{movie.title}</p>
                    <div className="rating">
                        <ThumbsUp className="thumbs-icon" />
                        <span>{movie.rating}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
