import React from 'react';
import MovieCard from 'components/Card';
import 'styles/Popular/grid_section.css';

const GridSection = ({ movies }) => {
    return (
        <div className="movie-grid">
            {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} aspectRatio="4 / 5" />
            ))}
        </div>
    );
};

export default GridSection;