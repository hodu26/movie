import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuthCheck = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(null);

  useEffect(() => {
    const savedTMDbKey = localStorage.getItem('TMDb-Key');

    if (!savedTMDbKey) {
      navigate('/signin');
    } else {
      setIsLogin(true);
    }
  }, [navigate]);

  return isLogin;
};

export default useAuthCheck;