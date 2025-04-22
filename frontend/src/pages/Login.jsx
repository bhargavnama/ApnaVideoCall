import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import VideoBackground from '../components/VideoBackground';
import styles from './Auth.module.css';
import { AuthContext } from '../contexts/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin(formData.username, formData.password);
      navigate('/home');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className={styles.authContainer}>
      <VideoBackground />
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.authForm}>
          <h2>Login</h2>
          {error && <p style={{ color: '#ff4444', textAlign: 'center' }}>{error}</p>}
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className={styles.neonButton}>
            Login
          </button>
          <p className={styles.switchAuth}>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
