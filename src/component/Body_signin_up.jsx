import React, { useState } from 'react';
import '../styles/signin_up.css';

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
            <h2>Login</h2>
            <div className="input-group">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" />
            </div>
            <div className="input-group">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <a href="#" className="forgot-password">Forgot Password?</a>
            <button className="btn btn-login">Login</button>
            <p className="toggle-text">
              Don't have an account? <span className="toggle" onClick={toggleForm}>Register Now</span>
            </p>
          </div>
        ) : (
          <div className="register-form">
            <h2>Registration</h2>
            <div className="input-group">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="First Name" />
            </div>
            <div className="input-group">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Last Name" />
            </div>
            <div className="input-group">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" />
            </div>
            <div className="input-group">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <button className="btn">Register</button>
            <p className="toggle-text">
              Already have an account? <span className="toggle" onClick={toggleForm}>Login Now</span>
            </p>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default LoginRegister;
