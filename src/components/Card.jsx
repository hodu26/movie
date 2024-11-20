import React, { useState } from 'react';
import { Star, ThumbsUp } from 'lucide-react';
import { TbRating18Plus } from "react-icons/tb";
import 'styles/card.css';

const MovieCard = ({ movie, aspectRatio }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <div className="movie-card">
            <div className="card-image" style={{aspectRatio: aspectRatio}}>
                {movie.adult && (
                    <TbRating18Plus className="card-adult-icon" />
                )}
                <div className="favorite-icon" onClick={toggleFavorite}>
                    <Star
                        fill={isFavorite ? '#facc15' : 'none'}
                        stroke="#facc15"
                        strokeWidth="1.5"
                    />
                </div>
                <img src={movie.poster_path} alt={movie.original_title} />
                <div className="card-overlay">
                    <p className="movie-title">{movie.original_title}</p>
                    <div className="rating">
                        <ThumbsUp className="thumbs-icon" />
                        <span>{movie.vote_average}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
