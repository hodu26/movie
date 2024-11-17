import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'styles/Home/body_home.css';

const MovieCategory = ({ title, movies, id }) => {
    const scroll = (direction, elementId) => {
        const container = document.getElementById(elementId);
        const elementWidth = container.firstElementChild.offsetWidth;
        const visibleCount = Math.floor(container.clientWidth / elementWidth);
        const scrollAmount = direction === 'left' 
            ? -elementWidth * (visibleCount - 1)
            : elementWidth * (visibleCount - 1);

        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };

    return (
        <div className="movie-category">
            <h2 className="category-title">{title}</h2>
            <div className="scroll-container group">
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
                    onClick={() => scroll('left', id)}
                    className="scroll-button scroll-left"
                >
                    <ChevronLeft className="text-white" />
                </button>
                <button
                    onClick={() => scroll('right', id)}
                    className="scroll-button scroll-right"
                >
                    <ChevronRight className="text-white" />
                </button>
            </div>
        </div>
    );
};

export default MovieCategory;
