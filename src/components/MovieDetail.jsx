import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/movie/${id}`, API_OPTIONS);
        const data = await res.json();
        setMovie(data);

        const videoRes = await fetch(`${API_BASE_URL}/movie/${id}/videos`, API_OPTIONS);
        const videoData = await videoRes.json();

        const officialTrailer = videoData.results.find(
          (vid) => vid.type === 'Trailer' && vid.site === 'YouTube'
        );

        if (officialTrailer) {
          setTrailerKey(officialTrailer.key);
        }
      } catch (err) {
        console.error('Error fetching movie or trailer:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  useEffect(() => {
    if (trailerKey) {
      const timer = setTimeout(() => {
        setShowTrailer(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [trailerKey]);

  if (loading) return <p className="text-white text-center mt-10">Loading movie...</p>;
  if (!movie) return <p className="text-white text-center mt-10">Movie not found.</p>;

  return (
    <div className="relative bg-dark-100 min-h-screen px-5 py-10">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Back Button */}
        <Link to="/" className="inline-block w-10 h-10 mb-6">
          <img
            src="/next-button.png"
            alt="Back"
            className="w-full h-full object-contain hover:opacity-80 transition"
          />
        </Link>

        {/* Title & Tagline */}
        <div className="text-center mb-10">
          <h1 className="text-white text-4xl font-bold">{movie.title}</h1>
          {movie.tagline && (
            <p className="italic text-light-200 text-lg mt-2">"{movie.tagline}"</p>
          )}
        </div>

        {/* Layout: Poster and Trailer */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Poster */}
          <div className="flex justify-center w-full md:w-[35%]">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`Poster for ${movie.title}`}
              className="w-full max-w-[300px] rounded-xl shadow-lg shadow-light-100/10 object-cover"
            />
          </div>

          {/* Trailer + Details */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Trailer */}
            {showTrailer && trailerKey && (
              <div>
                <div className="relative rounded-xl overflow-hidden shadow-lg shadow-indigo-600/20" style={{ paddingTop: '56.25%' }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=1`}
                    title="Movie Trailer"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full"
                  />
                </div>
              </div>
            )}

            {/* Details */}
            <div className="space-y-4 mt-4">
              <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <p><span className="font-bold text-white">Release:</span> <span className="text-white">{movie.release_date}</span></p>
                <p><span className="font-bold text-white">Language:</span> <span className="text-white">{movie.original_language.toUpperCase()}</span></p>
                <p><span className="font-bold text-white">Rating:</span> <span className="text-white">⭐ {movie.vote_average}</span></p>
                <p><span className="font-bold text-white">Runtime:</span> <span className="text-white">{movie.runtime} min</span></p>
                <p><span className="font-bold text-white">Genres:</span> <span className="text-white">{movie.genres.map((g) => g.name).join(', ')}</span></p>
              </div>

              {movie.homepage && (
                <a
                  href={movie.homepage}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-3 px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition"
                >
                  Visit Official Site
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
