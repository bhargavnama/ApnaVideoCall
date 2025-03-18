import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "./Signup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState(""); // Using username instead of email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const { handleRegister } = useContext(AuthContext);

  // Handle signup submission
  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      const result = await handleRegister(name, username, password);
      setMessage(result);
      setShowMessage(true);
      setName("");
      setUsername("");
      setPassword("");
      setError("");
    } catch (error) {
      let message = error.response?.data?.message || "Signup failed. Please try again.";
      setError(message);
    }
  };

  // Close the snackbar message
  const handleCloseMessage = () => {
    setShowMessage(false);
    setMessage("");
  };

  return (
    <div className="container">
      <form onSubmit={handleAuth}>
        <h2 className="text-center font-bold text-2xl">Sign Up</h2>

        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">Username</label>
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
            Create Account
          </button>
        </div>

        {/* Login Link */}
        <p className="signup-link">
          Already have an account?{" "}
          <Link to="/login" className="text-highlight">
            Login
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

export default Signup;
