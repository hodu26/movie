import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from 'utils/dataLoad';
import { API_URL, savedTMDbKey } from 'api/index';
import { toast } from 'react-toastify';

export const fetchPopularMovies = createAsyncThunk(
  'movies/fetchPopularMovies',
  async (page, { rejectWithValue }) => {
    try {
      const url = `${API_URL}/movie/popular?api_key=${savedTMDbKey}&language=ko-KR&page=${page}`;
      const data = await fetchData(url, '대세 콘텐츠');
      return {
        movies: data.results,
        totalPages: data.total_pages,
        page: page
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    page: 1,
    isLoading: false,
    error: null,
    totalPages: null,
  },
  reducers: {
    resetMovies: (state) => {
      state.movies = [];
      state.page = 1;
      state.totalPages = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        // rank 추가된 영화 데이터
        const moviesWithRank = action.payload.movies.map((movie, index) => ({
          ...movie,
          rank: state.movies.length + index + 1
        }));

        if (action.payload.page === 1) {
          state.movies = moviesWithRank;
        } else {
          state.movies = [...state.movies, ...moviesWithRank];
        }
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
        state.isLoading = false;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(state.error);
      });
  },
});

export const { resetMovies } = movieSlice.actions;
export default movieSlice.reducer;