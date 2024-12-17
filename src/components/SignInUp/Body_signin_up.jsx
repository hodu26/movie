import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'styles/SignInUp/body_signin_up.css';

function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigate = useNavigate();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  // 카카오 SDK 초기화
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.REACT_APP_KAKAO_API_KEY);
      console.log('Kakao SDK Initialized');
    }
  }, []);
  
  // 카카오 로그인 핸들러
  const handleKakaoLogin = () => {
    window.Kakao.Auth.login({
      scope: 'profile_nickname,account_email', // 요청할 권한 범위
      redirectUri: `${window.location.origin}/movie/signin/oauth2/code/kakao`, // 로그인 후 리다이렉트될 URI
      success: (authObj) => {
        console.log('Kakao Auth Success:', authObj);
      },
      fail: (err) => {
        console.error('Kakao Auth Error:', err);
      },
    });
  };

  // 로컬스토리지에서 데이터 로드
  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    const savedRememberMe = localStorage.getItem('rememberMe') === "true";

    if (savedEmail && savedRememberMe) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  // 이메일 유효성 검사 함수
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  // 로그인
  const handleLogin = () => {
    const savedUsers = JSON.parse(localStorage.getItem('users')) || {};

    if (!validateEmail(email)) {
      toast.error('이메일 형식이 올바르지 않습니다.');
      emailRef.current.focus();
      return;
    }

    if (savedUsers[email] === password) {
      localStorage.setItem('email', email);
      localStorage.setItem('rememberMe', rememberMe);
      localStorage.setItem('TMDb-Key', password);
      localStorage.setItem('retryApi', 0);

      toast.success(`안녕하세요, ${email}님!`);
      setEmail('');
      setPassword('');
      setRememberMe(false);
      navigate('/');
    } else {
      toast.error('이메일 또는 비밀번호가 올바르지 않습니다.');
      passwordRef.current.focus();
    }
  };

  // 회원가입
  const handleRegister = () => {
    const savedUsers = JSON.parse(localStorage.getItem('users')) || {};

    if (!validateEmail(email)) {
      toast.error('이메일 형식이 올바르지 않습니다.');
      emailRef.current.focus();
      return;
    }

    if (savedUsers[email]) {
      toast.error('이미 등록된 이메일입니다.');
      emailRef.current.focus();
      return;
    }

    if (!password || password !== confirmPassword) {
      toast.error('비밀번호가 일치하지 않습니다.');
      passwordRef.current.focus();
      return;
    }

    if (!agreeTerms) {
      toast.error('약관 확인 후 동의해주시기 바랍니다.');
      return;
    }

    // 유저별 정보 (위시리스트, 검색기록 ...)
    const savedUsersData = JSON.parse(localStorage.getItem('users_data')) || {};
    const newUserData = {
      wishlist: [],
      search_history: [],
    };

    savedUsers[email] = password;
    savedUsersData[email] = newUserData;
    localStorage.setItem('users', JSON.stringify(savedUsers));
    localStorage.setItem('users_data', JSON.stringify(savedUsersData));
    
    localStorage.setItem('email', '');
    localStorage.setItem('rememberMe', false);
    localStorage.setItem('retryApi', 0);

    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setIsLogin(true); // 회원가입 후 로그인 화면으로 변경
    toast.success(`${email}님 회원이 되신 것을 환영합니다.`);
  };

  const toggleForm = () => {
    const savedEmail = localStorage.getItem('email');
    const savedRememberMe = localStorage.getItem('rememberMe') === "true";

    if (isLogin) setEmail('');
    else setEmail(savedEmail);

    setPassword('');
    setConfirmPassword('');
    setAgreeTerms(false);
    setRememberMe(savedRememberMe);
    setIsLogin(!isLogin);
  };

  // 로그인/회원가입 폼이 전환되었을 때 포커스 처리
  useEffect(() => {
    if (isLogin) {
      if (!localStorage.getItem('email')) emailRef.current.focus();
      else passwordRef.current.focus();
    } else {
      emailRef.current.focus(); 
    }
  }, [isLogin, email]);

  return (
    <div className="signin-container">
      <div className="wrapper">
        <div className={`card ${isLogin ? "login-size" : "register-size"}`}>
          {isLogin ? (
            <div className="login-form">
              <h2 className="sign-title">로그인</h2>
              <div className="input-group">
                <i className="fas fa-envelope"></i>
                <input
                  ref={emailRef}
                  type="email"
                  placeholder="아이디 (이메일)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-group">
                <i className="fas fa-lock"></i>
                <input
                  ref={passwordRef}
                  type="password"
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />{' '}
                  <span className="checkmark"></span>
                  아이디 저장 및 로그인 유지
                </label>
              </div>
              <button className="forgot-password">비밀번호를 잊으셨나요?</button>
              <button className="btn btn-login" onClick={handleLogin}>
                로그인
              </button>
              {/* 카카오 로그인 버튼 */}
              <div className="social-login">
                <img
                  src={require('assets/image/kakao_login_wide.png')}
                  alt="카카오로 로그인"
                  className="btn-kakao"
                  onClick={handleKakaoLogin}
                />
              </div>
              <p className="toggle-text"> 계정이 없으신가요?{' '}
                <span className="toggle" onClick={toggleForm}>
                  회원가입
                </span>
              </p>
            </div>
          ) : (
            <div className="register-form">
              <h2 className="sign-title">회원가입</h2>
              <div className="input-group">
                <i className="fas fa-user"></i>
                <input
                  ref={emailRef}
                  type="email"
                  placeholder="아이디 (이메일)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-group">
                <i className="fas fa-lock"></i>
                <input
                  ref={passwordRef}
                  type="password"
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="input-group">
                <i className="fas fa-lock"></i>
                <input
                  ref={confirmPasswordRef}
                  type="password"
                  placeholder="비밀번호 확인"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={() => setAgreeTerms(!agreeTerms)}
                  />{' '}
                  <span className="checkmark"></span>
                  약관 확인 및 동의
                </label>
              </div>
              <button className="btn btn-register" onClick={handleRegister}>
                회원가입
              </button>
              <p className="toggle-text"> 이미 계정이 있으신가요?{' '}
                <span className="toggle" onClick={toggleForm}>
                  로그인
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginRegister;
