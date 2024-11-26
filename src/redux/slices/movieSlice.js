import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from 'utils/dataLoad';
import { GET_MOVIES_BY_TAG_URL, GET_MOVIES_BY_SEARCH_URL, GET_MOVIES_BY_FILTER_URL } from 'api/index';

// 영화 데이터 로드 (tag를 통해 구분)
export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (params, { rejectWithValue }) => {
    const { tag, adult, search, genres, release_dates, vote_averages, page } = params;
    if (Number(localStorage.getItem('retryApi')) > 3) return null;

    try {
      let data;

      // 위시리스트 데이터 로드 (로컬스토리지 사용 -> API X)
      if (tag === 'wish_list') {
        const storedData = JSON.parse(localStorage.getItem('users_data')) || {};
        const userEmail = localStorage.getItem('email');
        let wishlist = storedData[userEmail]?.wishlist || [];

        // 성인영화 필터링
        const filteredWishlist = wishlist.filter((wishMovie) => {
          const adultAllowMatch = (adult || !wishMovie.adult);

          return adultAllowMatch;
        });

        wishlist = {
          ...wishlist,
          results: filteredWishlist,
        };

        return {
          movies: filteredWishlist,
          totalPages: 1,
          page: 1,
        };
      }

      // 인기 영화 데이터 로드
      if (tag === 'popular') {
        data = await fetchData(GET_MOVIES_BY_TAG_URL({ tag, page }), '대세 콘텐츠');
      } 
      // 검색 및 필터 적용
      else if (tag === 'search_filter') {
        data = await handleSearchAndFilter({ search, adult, genres, release_dates, vote_averages, page });
      }

      // 기본 필터 API 호출
      if (search === '') {
        data = await fetchData(
          GET_MOVIES_BY_FILTER_URL({ adult, genres, vote_averages, page }),
          '필터링'
        );

        // 개봉일 필터링
        const filteredData = data.results.filter((movie) => {
          const releaseDateMatch = 
            !release_dates || // release_dates가 없거나 빈 배열일 경우 필터링 건너뛰기
            release_dates.length === 0 ||
            ( new Date(movie.release_date) >= new Date(release_dates.start || '0000-01-01') && 
              new Date(movie.release_date) <= new Date(release_dates.end || '9999-12-31'));
      
          return releaseDateMatch;
        });

        data =  {
          ...data,
          results: filteredData,
        };
      }

      return {
        movies: data.results,
        totalPages: data.total_pages,
        page,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 검색 및 필터링 처리 함수
const handleSearchAndFilter = async ({ search, adult, genres, release_dates, vote_averages, page }) => {
  if (search && search.trim()) {
    const searchData = await fetchData(
      GET_MOVIES_BY_SEARCH_URL({ adult, search, page }),
      '검색'
    );

    if (searchData.results.length) {
      const filteredMovies = filterMovies(searchData.results, {
        adult,
        genres,
        release_dates,
        vote_averages,
      });

      return {
        ...searchData,
        results: filteredMovies,
        total_pages: Math.ceil(filteredMovies.length / 20),
      };
    }
    return searchData;
  }
  return null;
};

// 영화 필터링 로직
const filterMovies = (movies, filters) => {
  const { adult, genres, release_dates, vote_averages } = filters;

  return movies.filter((movie) => {
    // 성인 콘텐츠 필터링
    const adultMatch = adult || !movie.adult;

    // 장르 필터링
    const genreMatch =
      !genres || genres.length === 0 || movie.genre_ids.some((id) => genres.includes(id));

    // 개봉일 필터링
    const releaseDateMatch = 
      !release_dates || // release_dates가 없거나 빈 배열일 경우 필터링 건너뛰기
      release_dates.length === 0 ||
      ( new Date(movie.release_date) >= new Date(release_dates.start || '0000-01-01') && 
        new Date(movie.release_date) <= new Date(release_dates.end || '9999-12-31'));

    // 평점 필터링
    const voteMatch = 
      (!vote_averages.min && !vote_averages.max) || // vote_averages가 없거나 최소값, 최대값이 설정되지 않으면 필터링을 건너뛰기
      (movie.vote_average >= vote_averages.min && movie.vote_average <= vote_averages.max);

    return adultMatch && genreMatch && releaseDateMatch && voteMatch;
  });
};



// Slice 정의
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
        const { movies, totalPages, page } = action.payload;

        // 페이지에 따라 데이터 병합 (위시리스트는 항상 page = 1)
        if (page === 1) {
          state.movies = movies.map((movie, index) => ({
            ...movie,
            rank: index + 1,
          }));
        } else {
          state.movies = [...state.movies, ...movies].map((movie, index) => ({
            ...movie,
            rank: index + 1,
          }));
        }

        state.page = page;
        state.totalPages = totalPages;
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
