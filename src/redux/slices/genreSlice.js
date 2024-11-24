import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GET_GENRE_TABLE_URL } from 'api/index';
import { fetchData } from 'utils/dataLoad';

// 장르 테이블 로드
export const fetchGenres = createAsyncThunk(
  'genres/fetchGenres',
  async (_, { rejectWithValue }) => {
    try {
      const savedGenres = localStorage.getItem('genres');
      const savedTime = localStorage.getItem('genresTimestamp');
      const currentTime = new Date().getTime();
      const dataIsExpired = savedTime && currentTime - savedTime > 3600000; // 1 hour
        
      if (savedGenres && !dataIsExpired) {
        return JSON.parse(savedGenres);
      }

      // 로컬 스토리지에 장르 테이블이 없거나 만료되었을 시 재발급
      const data = await fetchData(GET_GENRE_TABLE_URL, '장르');

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
      });
  },
});

export const { clearGenres } = genreSlice.actions;
export default genreSlice.reducer;
