import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import api from '../services/api';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('All');
  const [language, setLanguage] = useState('All');
  const [status, setStatus] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await api.get('/movies');
        setMovies(response.data);
      } catch (err) {
        setError('Failed to load movies.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = genre === 'All' || movie.genre === genre;
    const matchesLanguage = language === 'All' || movie.language === language;
    const matchesStatus = status === 'All' || movie.status === status;

    return matchesSearch && matchesGenre && matchesLanguage && matchesStatus;
  });

  const genres = ['All', ...new Set(movies.map((movie) => movie.genre))];
  const languages = ['All', ...new Set(movies.map((movie) => movie.language))];
  const statuses = ['All', ...new Set(movies.map((movie) => movie.status))];

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <h2 className="mb-0">Movies</h2>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="col-md-2">
          <select className="form-select" value={genre} onChange={(e) => setGenre(e.target.value)}>
            {genres.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <select className="form-select" value={language} onChange={(e) => setLanguage(e.target.value)}>
            {languages.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
            {statuses.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && <MovieList movies={filteredMovies} />}
    </div>
  );
}

export default Movies;
