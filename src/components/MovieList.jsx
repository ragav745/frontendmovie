import MovieCard from './MovieCard';

// Displays a grid of movies using the reusable MovieCard component.
function MovieList({ movies }) {
  return (
    <div className="row g-4 movie-grid">
      {movies.map((movie) => (
        <div className="col-md-6 col-lg-4" key={movie.id || movie._id}>
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  );
}

export default MovieList;
