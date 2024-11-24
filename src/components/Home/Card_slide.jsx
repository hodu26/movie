import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchData } from 'utils/dataLoad';
import { API_URL, savedTMDbKey } from 'api/index';
import MovieCard from 'components/Card';
import 'styles/Home/card_slide.css';

const MovieCategory = ({ title, tag, genres }) => {
    const containerRef = useRef(null);
    const [isTouching, setIsTouching] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [url, setUrl] = useState('');
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        if (movies.length) return ;
            
        const fetchMovies = async () => {

            if (tag === "popular" || tag === "now_playing") {
                setUrl(`${API_URL}/movie/${tag}?api_key=${savedTMDbKey}&language=ko-KR`); 
            }
            else {
                // 장르의 id 찾기
                console.log(genres);
                const findGenre = genres.find(genre => genre.name === tag); 
                const findGenreId = findGenre ? Number(findGenre.id) : null;

                setUrl(`${API_URL}/discover/movie?api_key=${savedTMDbKey}&include_adult=true&with_genres=${findGenreId}&language=ko-KR&sort_by=popularity.desc`);
            }

            const data = await fetchData(url, tag);

            setMovies(data.results || []);
        }

        fetchMovies();

    }, [movies, url, tag, genres])

    const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // 버튼을 통한 스크롤
    const scroll = (direction, elementId) => {
        const container = document.getElementById(elementId);
        const elementWidth = container.firstElementChild.offsetWidth;
        const visibleCount = Math.floor(container.clientWidth / elementWidth);
        const scrollAmount = direction === 'left'
            ? -elementWidth * Math.max(visibleCount - 1, 1)
            : elementWidth * Math.max(visibleCount - 1, 1);

        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };

    // 터치 스크롤
    const handleTouchStart = (e) => {
        if (!isTouchDevice()) return; // 터치 디바이스가 아니면 실행하지 않음
        setIsTouching(true);
        setStartX(e.touches[0].clientX);
        setScrollLeft(containerRef.current.scrollLeft);
    };

    const handleTouchMove = (e) => {
        if (!isTouching) return;
        const x = e.touches[0].clientX;
        const walk = (x - startX) * 2; // 드래그 속도 조정
        containerRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleTouchEnd = () => {
        setIsTouching(false);
    };

    return (
        <div className="movie-category">
            <h2 className="category-title">{title}</h2>
            <div
                className="scroll-container group"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div
                    id={tag}
                    className="movie-scroll-area"
                    ref={containerRef}
                >
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
                <button
                    onClick={() => scroll('left', tag)}
                    className="scroll-button scroll-left"
                    aria-label="Scroll Left"
                >
                    <ChevronLeft className="text-white" />
                </button>
                <button
                    onClick={() => scroll('right', tag)}
                    className="scroll-button scroll-right"
                    aria-label="Scroll Right"
                >
                    <ChevronRight className="text-white" />
                </button>
            </div>
        </div>
    );
};

export default MovieCategory;
