export const API_URL = 'https://api.themoviedb.org/3';

export const IMAGE_BASE_URL = 'http://image.tmdb.org/t/p';

export const savedTMDbKey = localStorage.getItem('TMDb-Key');



export const GET_GENRE_TABLE_URL = `${API_URL}/genre/movie/list?api_key=${savedTMDbKey}&language=ko`;

export const GET_MOVIES_BY_GENRE_URL = ({ genre, page }) => 
    `${API_URL}/discover/movie?api_key=${savedTMDbKey}&include_adult=true&with_genres=${genre}&language=ko-KR&sort_by=popularity.desc&page=${page}`;

export const GET_TRENDING_MOVIES_URL = ({ period, page }) =>
    `${API_URL}/trending/movie/${period}?api_key=${savedTMDbKey}&language=ko-KR&page=${page}`;

export const GET_MOVIES_BY_TAG_URL = ({ tag, page }) => 
    `${API_URL}/movie/${tag}?api_key=${savedTMDbKey}&language=ko-KR&page=${page}`;

export const GET_MOVIES_BY_SEARCH_URL = ({ adult, search, page }) => {
    // 1. decodeURIComponent로 혹시 모를 이전 인코딩 제거
    const decodedSearch = decodeURIComponent(search.trim()).replace(/%/g, '%25');;
    
    // 2. encodeURIComponent로 한글을 포함한 모든 문자 인코딩
    const searchParam = encodeURIComponent(decodedSearch).replace(/%/g, '%25');;

    return `${API_URL}/search/movie?api_key=${savedTMDbKey}&include_adult=${adult}&query=${searchParam}&language=ko-KR&page=${page}`;
};

export const GET_MOVIES_BY_FILTER_URL = ({ adult, genres, vote_averages, page }) => {
    const genreParam = genres ? genres.join('%7C') : ''; // 배열을 '|'로 연결하여 URL 인코딩  => ',' == and / '|' == or

    return `${API_URL}/discover/movie?api_key=${savedTMDbKey}&include_adult=${adult}&with_genres=${genreParam}
    &vote_average.gte=${vote_averages.min}&vote_average.lte=${vote_averages.max}
    &language=ko-KR&sort_by=popularity.desc&page=${page}`;
};