import React from "react";
import "./FilmTape.css";

const images = [
  "Aladdin.jpg",
  "Avengers Endgame.jpg",
  "AVENGERS_INFINITY WAR.jpg",
  "Inception.jpg",
  "Jumanji.jpg",
  "The Dark Knight.jpg",
  "The Maze Runner.jpg",
  "World war Z.jpg",
];

const FilmTape = () => {
  return (
    <div className="film-tape-container">
      {[0, 1, 2].map((rowIndex) => (
        <div
          key={rowIndex}
          className={`film-row row-${rowIndex % 2 === 0 ? "forward" : "reverse"}`}
        >
          {[...images, ...images].map((img, index) => (
            <img
              key={`${rowIndex}-${index}`}
              src={`/Images/${img}`}
              alt={img}
              className="film-image"
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default FilmTape;
