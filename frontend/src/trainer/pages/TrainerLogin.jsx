import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import loginIllustration from "../image/login.jpg";

const TrainerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/trainers/login", {
        email,
        password,
      });
      if (res.data.success) {
        const user = res.data.user;

        if (user.role !== "trainer") {
          setError("Unauthorized access");
          return;
        }

        sessionStorage.setItem("trainer", JSON.stringify(user));
        navigate("/trainer/dashboard");
      } else {
        setError(res.data.message || "Invalid login");
      }
    } catch (err) {
      setError("Login failed");
    }
  };

  return (
    <div className="login-container">
      {/* Left Side - Form */}
      <div className="login-left">
        <div className="logo">
          <span className="cube-icon">🟪</span> TheCubeFactory
        </div>

        <h2>Welcome back</h2>
        <p className="subtitle">Please enter your details</p>

        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}

          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-options">
            <label className="remember">
              <input type="checkbox" /> Remember for 30 days
            </label>
            <a href="#" className="forgot">
              Forgot password
            </a>
          </div>

          <button type="submit" className="signin-btn">
            Sign in
          </button>

          <button type="button" className="google-btn">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
            />
            Sign in with Google
          </button>
        </form>

        <p className="signup-text">
          Don’t have an account? <a href="#">Sign up</a>
        </p>
      </div>

      {/* Right Side - Illustration */}
      <div className="login-right">
        <img src={loginIllustration} alt="Login illustration" />
      </div>
    </div>
  );
};

export default TrainerLogin;
