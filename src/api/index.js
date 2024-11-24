export const API_URL = 'https://api.themoviedb.org/3';

export const IMAGE_BASE_URL = 'http://image.tmdb.org/t/p';

export const savedTMDbKey = localStorage.getItem('TMDb-Key');



export const GET_GENRE_TABLE_URL = `${API_URL}/genre/movie/list?api_key=${savedTMDbKey}&language=ko`;

export const GET_MOVIES_BY_GENRE_URL = ({ genre, page }) => 
    `${API_URL}/discover/movie?api_key=${savedTMDbKey}&include_adult=true&with_genres=${genre}&language=ko-KR&sort_by=popularity.desc&page=${page}`;

export const GET_TRENDING_MOVIES_URL = ({ period, page }) =>
    `${API_URL}/trending/movie/${period}?language=ko-KR&page=${page}`;

export const GET_MOVIES_BY_TAG_URL = ({ tag, page }) => 
    `${API_URL}/movie/${tag}?api_key=${savedTMDbKey}&language=ko-KR&page=${page}`;