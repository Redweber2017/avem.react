import { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('https://avemfinalbackend.onrender.com/auth/login', {
        username: 'admin',
        password: password,
      });

      if (response.status === 200) {
        setErrorMessage('');
        navigate('/serial');
      } else {
        setErrorMessage('Login failed');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage('Incorrect credentials');
      } else {
        setErrorMessage('An error occurred, please try again');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <svg viewBox="0 0 1440 320" className="background-wave">
        <path fill="#ffffff0a" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,154.7C672,160,768,192,864,197.3C960,203,1056,181,1152,149.3C1248,117,1344,75,1392,53.3L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
      </svg>

      <div className="login-box">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-container">
            <input type="text" value="admin" readOnly />
          </div>

          <div className="input-container password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {loading && <div className="loading-spinner"></div>}
          {errorMessage && <div className="error">{errorMessage}</div>}
        </form>
      </div>
    </div>
  );
};

export default Login;