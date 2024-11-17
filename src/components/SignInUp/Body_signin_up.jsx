import React, { useState } from 'react';
import 'styles/SignInUp/body_signin_up.css';

function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
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
              <input type="email" placeholder="아이디 (이메일)" />
            </div>
            <div className="input-group">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="비밀번호" />
            </div>
            <button className="forgot-password">비밀번호를 잊으셨나요?</button>
            <button className="btn btn-login">로그인</button>
            <p className="toggle-text">
              계정이 없으신가요? <span className="toggle" onClick={toggleForm}>회원가입</span>
            </p>
          </div>
        ) : (
          <div className="register-form">
            <h2 className="sign-title">회원가입</h2>
            <div className="input-group">
              <i className="fas fa-user"></i>
              <input type="email" placeholder="아이디 (이메일)" />
            </div>
            <div className="input-group">
              <i className="fas fa-user"></i>
              <input type="password" placeholder="비밀번호" />
            </div>
            <div className="input-group">
              <i className="fas fa-envelope"></i>
              <input type="password" placeholder="비밀번호 확인" />
            </div>
            <button className="btn">회원가입</button>
            <p className="toggle-text">
              이미 계정이 있으신가요? <span className="toggle" onClick={toggleForm}>로그인</span>
            </p>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default LoginRegister;
