import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import api from '../services/api';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await api.get(`/movies/${id}`);
        setMovie(response.data);
      } catch (err) {
        setError('Unable to load movie details.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!movie) return <ErrorMessage message="Movie not found." />;

  return (
    <div className="container py-5">
      <div className="row g-4 align-items-center">
        <div className="col-md-5">
          <img src={movie.poster} alt={movie.title} className="img-fluid rounded shadow" />
        </div>

        <div className="col-md-7">
          <span className="badge bg-warning text-dark mb-2">{movie.status}</span>
          <h1>{movie.title}</h1>
          <p className="text-muted">{movie.genre} • {movie.language} • {movie.duration} min</p>
          <p className="mb-3">
            <strong>Release Date:</strong> {movie.releaseDate?.split('-').reverse().join('/')}
          </p>
          {movie.status === 'Coming Soon' && (
            <p className="text-warning-emphasis fw-semibold">Booking opens before release date</p>
          )}
          <p className="lead">{movie.description}</p>

          <div className="mb-3">
            <strong>Rating:</strong> {movie.rating}/10
          </div>

          <div className="mb-3">
            <strong>Cast:</strong> {movie.cast?.join(', ')}
          </div>

          <div className="d-flex gap-3 flex-wrap">
            {movie.trailerLink && (
              <a className="btn btn-outline-dark" href={movie.trailerLink} target="_blank" rel="noreferrer">
                Watch Trailer
              </a>
            )}
            {movie.status === 'Now Showing' ? (
              <Link
                to="/select-show"
                state={{ selectedMovie: movie._id || movie.id }}
                className="btn btn-warning"
              >
                Book Ticket
              </Link>
            ) : (
              <span className="btn btn-outline-secondary disabled">Bookings open before release</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
