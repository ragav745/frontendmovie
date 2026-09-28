import { Link } from 'react-router-dom';

// Reusable movie card component that displays movie info and a booking button.
function MovieCard({ movie }) {
  return (
    <div className="card h-100 shadow-sm border-0 movie-card">
      <img src={movie.poster} alt={movie.title} className="card-img-top movie-card-image" />
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title mb-0">{movie.title}</h5>
          <span className="badge bg-warning text-dark">{movie.rating}</span>
        </div>

        <p className="text-muted small mb-2">{movie.genre} • {movie.language}</p>
        <p className="card-text flex-grow-1">{movie.description}</p>
        {movie.status === 'Coming Soon' && (
          <p className="text-warning-emphasis small fw-semibold mb-2">Booking opens before release date</p>
        )}

        <div className="d-flex justify-content-between align-items-center mt-3">
          <span className="text-success fw-semibold">{movie.status}</span>
          <Link to={`/movie/${movie.id || movie._id}`} className="btn btn-dark btn-sm">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
