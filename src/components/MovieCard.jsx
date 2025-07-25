import React from 'react';
import { Link } from 'react-router-dom'; // ✅ Step 1: Import Link

// ✅ Step 2: Destructure 'id' from the movie props
const MovieCard = ({
  movie: {
    id,
    title,
    vote_average,
    poster_path,
    release_date,
    original_language
  }
}) => {
  return (
    // ✅ Step 3: Wrap entire card in <Link> to make it clickable
    <Link
      to={`/movie/${id}`}
      className="movie-card hover:scale-105 transition-transform text-inherit no-underline"
    >
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : '/no-movie.png'
        }
        alt={`Poster for ${title}`}
      />
      <div className="mt-4">
        <h3>{title}</h3>
        <div className="content">
          <div className="rating">
            <img src="star.svg" alt="Star Icon" />
            <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
            <span> </span>
            <p className="lang">{original_language}</p>
            <span> </span>
            <p className="year">
              {release_date ? release_date.split('-')[0] : 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
