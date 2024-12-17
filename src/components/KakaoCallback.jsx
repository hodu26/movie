import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setTokens } from '../redux/slices/kakaoAuthSlice'; // Redux 액션
import axios from 'axios';
import { toast } from 'react-toastify';

const KakaoCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get('code');

    const getAccessToken = async (code) => {
      try {
        const response = await axios.post('https://kauth.kakao.com/oauth/token', null, {
          params: {
            grant_type: 'authorization_code',
            client_id: process.env.REACT_APP_KAKAO_API_KEY,
            redirect_uri: `${window.location.origin}/movie/signin/oauth2/code/kakao`,
            code: code,
          },
        });

        const { access_token, refresh_token, expires_in } = response.data;

        // Redux 상태 업데이트
        dispatch(setTokens({ accessToken: access_token, refreshToken: refresh_token, expires_in: expires_in }));

        // 사용자 정보 가져오기
        getUserInfo(access_token);
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };

    const getUserInfo = async (accessToken) => {
      try {
        const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        const kakaoEmail = response.data.kakao_account.email;
        const nickname = response.data.kakao_account.profile.nickname;

        // 카카오 회원정보 콘솔에 출력
        console.log(`회원 정보 => email: ${kakaoEmail}, nickname: ${nickname}`)

        handleUserAuthentication(kakaoEmail, nickname);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    const handleUserAuthentication = (kakaoEmail, nickname) => {
      const savedUsers = JSON.parse(localStorage.getItem('users')) || {};

      if (!savedUsers[kakaoEmail]) {
        const savedUsersData = JSON.parse(localStorage.getItem('users_data')) || {};
        const newUserData = { wishlist: [], search_history: [] };

        savedUsers[kakaoEmail] = `${process.env.REACT_APP_TMDB_KEY}`;
        savedUsersData[kakaoEmail] = newUserData;

        toast.success(`${nickname}님 회원이 되신 것을 환영합니다!`);
        localStorage.setItem('users', JSON.stringify(savedUsers));
        localStorage.setItem('users_data', JSON.stringify(savedUsersData));
      }

      toast.success(`${nickname}님 환영합니다!`);
      localStorage.setItem('email', kakaoEmail);
      localStorage.setItem('nickname', nickname);
      localStorage.setItem('rememberMe', false);
      localStorage.setItem('TMDb-Key', `${process.env.REACT_APP_TMDB_KEY}`);
      localStorage.setItem('retryApi', 0);
      navigate('/');
    };

    if (code) {
      getAccessToken(code);
    } else {
      console.error('Code not found');
    }
  }, [location, dispatch, navigate]);

  return <div>로그인 중...</div>;
};

export default KakaoCallback;
