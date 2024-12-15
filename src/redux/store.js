import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './slices/movieSlice';
import genreReducer from './slices/genreSlice';
import authReducer from './slices/kakaoAuthSlice';

const store = configureStore({
  reducer: {
    movies: movieReducer,
    genres: genreReducer,
    kakaoAuth: authReducer,
  }, 
});

export default store;
