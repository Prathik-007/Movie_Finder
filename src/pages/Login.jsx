import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Signup.css";
import "../components/FilmTape.css"; // Uses the same film tape styling

const imageList = [
  "Aladdin.jpg",
  "Avengers Endgame.jpg",
  "AVENGERS_ INFINITY WAR.jpg",
  "Inception.jpg",
  "Jumanji.jpg",
  "The Dark Knight.jpg",
  "The Maze Runner.jpg",
  "World war Z.jpg"
];

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", formData);
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/");
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  const renderImages = (times = 2) =>
    [...Array(times)].flatMap(() =>
      imageList.map((img, i) => (
        <img key={`${img}-${i}`} src={`/Images/${img}`} alt={img} />
      ))
    );

  return (
    <div className="signup-page">
      {/* Background Film Tapes (same as Signup) */}
      <div className="film-tape-container">
        <div className="film-tape tape-top">{renderImages(3)}</div>
        <div className="film-tape tape-middle reverse">{renderImages(3)}</div>
        <div className="film-tape tape-bottom">{renderImages(3)}</div>
      </div>

      {/* Login Form */}
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Sign In</button>
          {message && <p style={{ color: "#ff4d4d", marginTop: "10px" }}>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
