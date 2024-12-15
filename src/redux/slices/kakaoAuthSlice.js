import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// 초기 상태
const initialState = {
  accessToken: localStorage.getItem('kakao_access_token') || null,
  refreshToken: localStorage.getItem('kakao_refresh_token') || null,
  isAuthenticated: !!localStorage.getItem('kakao_access_token'),
  loading: false,
};

// 액세스 토큰 갱신 비동기 작업
export const refreshAccessToken = createAsyncThunk(
  'auth/refreshAccessToken',
  async (_, { getState, rejectWithValue }) => {
    const { refreshToken } = getState().auth;

    if (!refreshToken) {
      toast.error('리프레시 토큰이 없습니다. 다시 로그인하세요.');
      return rejectWithValue('No refresh token');
    }

    try {
      const response = await axios.post('https://kauth.kakao.com/oauth/token', null, {
        params: {
          grant_type: 'refresh_token',
          client_id: process.env.REACT_APP_KAKAO_SOCIAL_LOGIN,
          refresh_token: refreshToken,
        },
      });

      const { access_token, refresh_token, expires_in } = response.data;

      // expires_in 값이 유효한지 확인하고 유효하지 않으면 기본값 설정
      if (isNaN(expires_in) || expires_in <= 0) {
        throw new Error('유효하지 않은 expires_in 값입니다.');
      }

      // 새 토큰 저장
      localStorage.setItem('kakao_access_token', access_token);
      if (refresh_token) {
        localStorage.setItem('kakao_refresh_token', refresh_token);
      }

      // 만료 시간 갱신
      const expiryTime = new Date().getTime() + response.data.expires_in * 1000;
      localStorage.setItem('kakao_access_token_expiry', expiryTime);

      toast.success('Access Token이 갱신되었습니다.');
      return { accessToken: access_token, refreshToken: refresh_token || refreshToken };
    } catch (err) {
      console.error('Access Token 갱신 실패:', err);
      return rejectWithValue(err.response.data || 'Failed to refresh token');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      // Redux 상태 초기화
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    
      // LocalStorage 초기화
      localStorage.removeItem('kakao_access_token');
      localStorage.removeItem('kakao_refresh_token');
      localStorage.removeItem('kakao_access_token_expiry');
      localStorage.removeItem('nickname');
    
      // Kakao 로그아웃 API 호출
      if (window.Kakao && window.Kakao.Auth) {
        window.Kakao.Auth.logout(() => {
          console.log('Kakao 로그아웃 완료');
        });
      }
    
      toast.info('로그아웃되었습니다.');
    },
    setTokens(state, action) {
      // 액세스 토큰 및 리프레시 토큰 설정
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;

      localStorage.setItem('kakao_access_token', action.payload.accessToken);
      localStorage.setItem('kakao_refresh_token', action.payload.refreshToken);

      // 만료 시간 저장
      const expiryTime = new Date().getTime() + action.payload.expires_in * 1000;
      localStorage.setItem('kakao_access_token_expiry', expiryTime);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshAccessToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken || state.refreshToken;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(refreshAccessToken.rejected, (state) => {
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.loading = false;
      });
  },
});

export const { logout, setTokens } = authSlice.actions;
export default authSlice.reducer;

// 액세스 토큰 확인 함수 (만료 확인 및 갱신)
export const checkAccessToken = () => (dispatch, getState) => {
  const expiryTime = localStorage.getItem('kakao_access_token_expiry');
  const currentTime = new Date().getTime();

  if (expiryTime && currentTime >= expiryTime) {
    // 만료되었으면 액세스 토큰 갱신
    dispatch(refreshAccessToken());
  }
  // 만료되지 않았다면 액세스 토큰을 사용할 수 있습니다.
};
