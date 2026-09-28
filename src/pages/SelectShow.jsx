import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';

function SelectShow() {
  const location = useLocation();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [theatres, setTheatres] = useState([]);
  const [shows, setShows] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(location.state?.selectedMovie || '');
  const [selectedTheatre, setSelectedTheatre] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedShow, setSelectedShow] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [moviesRes, theatresRes, showsRes] = await Promise.all([
          api.get('/movies'),
          api.get('/theatres'),
          api.get('/shows')
        ]);

        setMovies(moviesRes.data);
        setTheatres(theatresRes.data);
        setShows(showsRes.data);
      } catch (error) {
        console.error('Failed to load booking selection data:', error);
      }
    };

    loadData();
  }, []);

  const filteredShows = shows.filter((show) => {
    const movieMatch = !selectedMovie || show.movie?._id === selectedMovie || show.movie === selectedMovie;
    const theatreMatch = !selectedTheatre || show.theatre?._id === selectedTheatre || show.theatre === selectedTheatre;
    const dateMatch = !selectedDate || show.date === selectedDate;

    return movieMatch && theatreMatch && dateMatch;
  });

  const handleContinue = () => {
    if (!selectedShow) return;

    const selectedShowDetails = shows.find((show) => show._id === selectedShow);
    if (!selectedShowDetails) return;

    navigate('/seat-selection', {
      state: {
        selectedShow: selectedShowDetails
      }
    });
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Select Show</h2>

      <div className="row g-4">
        <div className="col-md-4">
          <label className="form-label">Movie</label>
          <select className="form-select" value={selectedMovie} onChange={(e) => setSelectedMovie(e.target.value)}>
            <option value="">Choose a movie</option>
            {movies.map((movie) => (
              <option key={movie._id || movie.id} value={movie._id || movie.id}>{movie.title}</option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Theatre</label>
          <select className="form-select" value={selectedTheatre} onChange={(e) => setSelectedTheatre(e.target.value)}>
            <option value="">Choose theatre</option>
            {theatres.map((theatre) => (
              <option key={theatre._id} value={theatre._id}>{theatre.name}</option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-5">
        <h4>Available Show Times</h4>

        <div className="row g-3 mt-2">
          {filteredShows.length > 0 ? (
            filteredShows.map((show) => (
              <div className="col-md-4" key={show._id}>
                <button
                  className={`btn w-100 ${selectedShow === show._id ? 'btn-warning' : 'btn-outline-dark'}`}
                  onClick={() => setSelectedShow(show._id)}
                >
                  <div>{show.theatre?.name || 'Theatre'}</div>
                  <small>{show.date} • {show.time}</small>
                  <div>₹{show.ticketPrice}</div>
                </button>
              </div>
            ))
          ) : (
            <div className="col-12">
              <div className="alert alert-info">No show times available for the selected options.</div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4">
        <button className="btn btn-dark" onClick={handleContinue} disabled={!selectedShow}>
          Continue to Seats
        </button>
      </div>
    </div>
  );
}

export default SelectShow;
