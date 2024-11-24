import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from 'utils/dataLoad';
import { GET_MOVIES_BY_TAG_URL, GET_MOVIES_BY_SEARCH_URL, GET_MOVIES_BY_FILTER_URL } from 'api/index';

// 영화 데이터 로드 (tag를 통해 구분)
export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async ({ tag, adult, search, genres, release_dates, vote_averages, page }, { rejectWithValue }) => {
    if (Number(localStorage.getItem('retryApi')) > 3) return null;

    try {
      let data;
      if (tag === 'populars') {
        // 인기 영화 데이터 로드
        data = await fetchData(GET_MOVIES_BY_TAG_URL({ tag: tag, page: page }), '대세 콘텐츠');
      } 
      else { // tag === 'search_filter'
        // 검색어 & 필터링 영화 데이터 로드
        const searchData = await fetchData(GET_MOVIES_BY_SEARCH_URL({ adult: adult, search: search, page: page }), '검색');
        const filterData = await fetchData(
          GET_MOVIES_BY_FILTER_URL({
            adult: adult,
            genres: genres,
            release_dates: release_dates,
            vote_averages: vote_averages,
            page: page,
          }),
          '필터링'
        );

        // 만약 검색과 필터 결과가 둘 다 있으면 ID 기준으로 교집합을 찾아서 영화 결합
        if (searchData.results.length !== 0 && filterData.results.length !== 0) {
          const filteredMovies = searchData.results.filter((searchMovie) =>
            filterData.results.some((filterMovie) => filterMovie.id === searchMovie.id)
          );

          data.results = filteredMovies;
          data.total_pages = Math.min(searchData.total_pages, filterData.total_pages);
        }
        else { // 각각 데이터가 하나만 있는 경우 반환
          data = filterData.results.length === 0 ? searchData : filterData;
        }
      }

      return {
        movies: data.results,
        totalPages: data.total_pages,
        page: page,
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        if (action.payload.page === 1) {
          const moviesWithRank = action.payload.movies.map((movie, index) => ({
            ...movie,
            rank: index + 1,
          }));
          state.movies = moviesWithRank;
        } 
        else {
          const moviesWithRank = [...state.movies, ...action.payload.movies].map((movie, index) => ({
            ...movie,
            rank: index + 1,
          }));
          state.movies = moviesWithRank;
        }
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
        state.isLoading = false;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetMovies } = movieSlice.actions;
export default movieSlice.reducer;
