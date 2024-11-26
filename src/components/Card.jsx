import React, { useState, useEffect, useMemo } from 'react';
import { Star, ThumbsUp } from 'lucide-react';
import { TbRating18Plus } from "react-icons/tb";
import { IMAGE_BASE_URL } from 'api/index';
import 'styles/card.css';

const MovieCard = ({ movie, onChangeWishList, aspectRatio }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [userEmail, setUserEmail] = useState(null);
    const [storedData, setStoredData] = useState({});

    // 로컬 스토리지에서 초기 상태 로드
    useEffect(() => {
        setUserEmail(localStorage.getItem('email'));
        setStoredData(JSON.parse(localStorage.getItem('users_data')));
    }, []); // 초기 1회 실행
    
    const userWishlist = useMemo(() => {
        return storedData[userEmail]?.wishlist || [];
    }, [storedData, userEmail]);
    
    useEffect(() => {
        const isMovieInWishlist = userWishlist.some((wishlistMovie) => wishlistMovie.id === movie.id);
        setIsFavorite(isMovieInWishlist);
    }, [userWishlist, movie.id]);

    // 로컬 스토리지에 데이터 저장
    const updateLocalStorage = (updatedWishlist) => {
        const updatedUserData = {
            ...storedData,
            [userEmail]: {
                ...storedData[userEmail],
                wishlist: updatedWishlist,
            },
        };
        localStorage.setItem('users_data', JSON.stringify(updatedUserData));
    };

    const toggleFavorite = () => {
        const userWishlist = storedData[userEmail]?.wishlist || [];

        let updatedWishlist;
        if (isFavorite) {
            // Remove movie from wishlist
            updatedWishlist = userWishlist.filter((wishlistMovie) => wishlistMovie.id !== movie.id);
        } else {
            // Add movie to wishlist
            updatedWishlist = [...userWishlist, movie];
        }

        updateLocalStorage(updatedWishlist);
        setIsFavorite(!isFavorite);

        // wish_list 페이지 재로딩
        onChangeWishList();
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
                <img src={ movie.poster_path !== null ? `${IMAGE_BASE_URL}/original${movie.poster_path}` : require('assets/image/no-poster-image.png') } alt={movie.original_title} />
                <div className="card-overlay">
                    <p className="movie-title">{movie.title}</p>
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
