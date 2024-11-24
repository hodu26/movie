import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from 'utils/dataLoad';
import { toast } from 'react-toastify';

const API_URL = 'https://api.themoviedb.org/3';
const savedTMDbKey = localStorage.getItem('TMDb-Key');

// Async thunk for fetching genres
export const fetchGenres = createAsyncThunk(
  'genres/fetchGenres',
  async (_, { rejectWithValue }) => {
    try {
      const savedGenres = localStorage.getItem('genres');
      const savedTime = localStorage.getItem('genresTimestamp');
      const currentTime = new Date().getTime();
      const dataIsExpired = savedTime && currentTime - savedTime > 3600000; // 1 hour
        
      if (savedGenres && !dataIsExpired) {
        return JSON.parse(savedGenres); // Return cached genres
      }

      // Fetch new genres if not cached or expired
      const url = `${API_URL}/genre/movie/list?api_key=${savedTMDbKey}&language=ko`;
      const data = await fetchData(url, '장르');

      if (data && data.genres) {
        localStorage.setItem('genres', JSON.stringify(data.genres));
        localStorage.setItem('genresTimestamp', currentTime.toString());
        return data.genres;
      }

      throw new Error('Failed to fetch genres');
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const genreSlice = createSlice({
  name: 'genres',
  initialState: {
    genres: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearGenres: (state) => {
      state.genres = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenres.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.genres = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(state.error);
      });
  },
});

export const { clearGenres } = genreSlice.actions;
export default genreSlice.reducer;
