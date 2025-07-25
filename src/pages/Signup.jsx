import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Signup.css";
import "../components/FilmTape.css";

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

const Signup = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/signup", userData);
      console.log(res.data);
      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
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
      {/* Background Film Tapes */}
      <div className="film-tape-container">
        <div className="film-tape tape-top">{renderImages(3)}</div>
        <div className="film-tape tape-middle reverse">{renderImages(3)}</div>
        <div className="film-tape tape-bottom">{renderImages(3)}</div>
      </div>

      {/* Signup Form */}
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Signup</h2>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={userData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={userData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={userData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
