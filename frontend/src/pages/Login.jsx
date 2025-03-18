import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const { handleLogin } = useContext(AuthContext);

  // Handle login submission
  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      const result = await handleLogin(username, password);
      setMessage(result);
      setShowMessage(true);
      setUsername("");
      setPassword("");
      setError("");
    } catch (error) {
      let message = error.response?.data?.message || "Login failed. Please try again.";
      setError(message);
    }
  };

  // Close the snackbar
  const handleCloseMessage = () => {
    setShowMessage(false);
    setMessage("");
  };

  return (
    <div className="container">
      <form onSubmit={handleAuth}>
        <h2 className="text-center font-bold text-2xl">Login</h2>

        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Error Message */}
        {error && <p className="error">{error}</p>}

        <div className="submit">
          <button type="submit" className="bg-primary p-2 rounded-lg">
            Login
          </button>
        </div>

        {/* Signup Link */}
        <p className="signup-link">
          Don't have an account?{" "}
          <Link to="/signup" className="text-highlight">
            Sign Up
          </Link>
        </p>
      </form>

      {/* Snackbar Message */}
      {showMessage && (
        <div className="snackbar">
          {message}
          <button className="close-btn" onClick={handleCloseMessage}>
            ✖
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
