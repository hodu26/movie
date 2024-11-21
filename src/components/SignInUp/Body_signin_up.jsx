import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'styles/SignInUp/body_signin_up.css';

function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigate = useNavigate();

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
      alert('이메일 형식이 올바르지 않습니다.');
      return;
    }

    if (savedUsers[email] === password) {
      localStorage.setItem('email', email);
      localStorage.setItem('rememberMe', rememberMe);
      localStorage.setItem('TMDb-Key', password);

      setEmail('');
      setPassword('');
      setRememberMe(false);

      navigate('/');
    } else {
      alert('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  // 회원가입
  const handleRegister = () => {
    const savedUsers = JSON.parse(localStorage.getItem('users')) || {};

    if (!validateEmail(email)) {
      alert('이메일 형식이 올바르지 않습니다.');
      return;
    }

    if (savedUsers[email]) {
      alert('이미 등록된 이메일입니다.');
      return;
    }

    if (!password || password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!agreeTerms) {
      alert('약관 확인 후 동의해주시기 바랍니다.');
      return;
    }

    const savedUsersData = JSON.parse(localStorage.getItem('users_data')) || {};
    const newUserData = {
      wishlist: [],
    };

    savedUsers[email] = password;
    savedUsersData[email] = newUserData;
    localStorage.setItem('users', JSON.stringify(savedUsers));
    localStorage.setItem('users_data', JSON.stringify(savedUsersData));
    
    localStorage.setItem('email', '');
    localStorage.setItem('rememberMe', false);

    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setIsLogin(true); // 회원가입 후 로그인 화면으로 변경
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
                  type="email"
                  placeholder="아이디 (이메일)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-group">
                <i className="fas fa-lock"></i>
                <input
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
                  type="email"
                  placeholder="아이디 (이메일)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-group">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="input-group">
                <i className="fas fa-lock"></i>
                <input
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
              <button className="btn" onClick={handleRegister}>
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
