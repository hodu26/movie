import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TbTrendingUp } from "react-icons/tb";
import { FaPlayCircle, FaTheaterMasks, FaFistRaised, FaSkullCrossbones } from 'react-icons/fa';
import { fetchData } from 'utils/dataLoad';
import { GET_MOVIES_BY_GENRE_URL, GET_TRENDING_MOVIES_URL, GET_MOVIES_BY_TAG_URL } from 'api/index';
import MovieCard from 'components/Card';
import 'styles/Home/card_slide.css';

const MovieCategory = ({ title, tag, period, genres }) => {
    const containerRef = useRef(null);
    const [isTouching, setIsTouching] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [url, setUrl] = useState('');
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        if (movies.length) return ;
            
        const fetchMovies = async () => {

            if (tag === "trending1" || tag === "trending2") {
                setUrl(GET_TRENDING_MOVIES_URL({ period: period, page: 1 })); 
            }
            else if (tag === "now_playing") {
                setUrl(GET_MOVIES_BY_TAG_URL({ tag: tag, page: 1 })); 
            }
            else {
                // 장르의 id 찾기
                const findGenre = genres.find(genre => genre.name === tag); 
                const findGenreId = findGenre ? Number(findGenre.id) : null;

                setUrl(GET_MOVIES_BY_GENRE_URL({ genre: findGenreId, page: 1 }));
            }

            const data = await fetchData(url, tag);

            setMovies(data.results || []);
        }

        fetchMovies();

    }, [movies, url, tag, genres, period])

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
            <h2 className="category-title">
                {title}
                {tag === "trending1" && <TbTrendingUp className="category-icon-size text-red-400" />}
                {tag === "trending2" && <TbTrendingUp className="category-icon-size text-yellow-400" />}
                {tag === "now_playing" && <FaPlayCircle className="category-icon-size text-green-400" />}
                {tag === "액션" && <FaFistRaised className="category-icon-size text-blue-400" />}
                {tag === "코미디" && <FaTheaterMasks className="category-icon-size text-yellow-400" />}
                {tag === "공포" && <FaSkullCrossbones className="category-icon-size text-gray-400" />}
            </h2>
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
