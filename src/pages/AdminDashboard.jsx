import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

function AdminDashboard() {
  const { token } = useAuth();
  const [movies, setMovies] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadAdminData = async () => {
      try {
        const headers = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const [moviesResponse, usersResponse, bookingsResponse] = await Promise.all([
          api.get('/movies'),
          api.get('/admin/users', headers),
          api.get('/admin/bookings', headers)
        ]);
        setMovies(moviesResponse.data);
        setUsers(usersResponse.data);
        setBookings(bookingsResponse.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Unable to load admin data.');
      }
    };

    if (token) {
      loadAdminData();
    }
  }, [token]);

  const handleDeleteMovie = async (movieId) => {
    if (!window.confirm('Delete this movie?')) {
      return;
    }

    try {
      await api.delete(`/movies/${movieId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMovies((currentMovies) => currentMovies.filter((movie) => movie._id !== movieId));
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to delete movie.');
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Owner Dashboard</h2>

      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm p-3">
            <h6>Total Movies</h6>
            <h3>{movies.length}</h3>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm p-3">
            <h6>Total Consumers</h6>
            <h3>{users.filter((account) => account.role === 'user').length}</h3>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm p-3">
            <h6>Total Bookings</h6>
            <h3>{bookings.length}</h3>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm p-3">
            <h6>Confirmed</h6>
            <h3>{bookings.filter((booking) => booking.status === 'Confirmed').length}</h3>
          </div>
        </div>
      </div>

      <div className="d-flex gap-3 flex-wrap mb-4">
        <Link to="/admin/add-movie" className="btn btn-warning">Add Movie</Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card shadow-sm border-0 p-3 mb-4">
        <h4>Manage Movies</h4>
        <div className="table-responsive">
          <table className="table table-striped mt-3 align-middle">
            <thead>
              <tr>
                <th>Movie</th>
                <th>Status</th>
                <th>Release Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.status}</td>
                  <td>{movie.releaseDate?.split('-').reverse().join('/')}</td>
                  <td>
                    <Link to={`/admin/edit-movie/${movie._id}`} className="btn btn-sm btn-outline-dark me-2">
                      Edit
                    </Link>
                    <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteMovie(movie._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card shadow-sm border-0 p-3">
        <h4>Consumer Bookings</h4>
        <div className="table-responsive">
          <table className="table table-striped mt-3">
            <thead>
              <tr>
                <th>User</th>
                <th>Movie</th>
                <th>Seats</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.user?.name || booking.user?.email || 'Unknown user'}</td>
                  <td>{booking.movie?.title || 'Unknown movie'}</td>
                  <td>{booking.seats?.join(', ') || '-'}</td>
                  <td>Rs. {booking.totalAmount}</td>
                  <td>
                    <span className={`badge ${booking.status === 'Confirmed' ? 'bg-success' : 'bg-secondary'}`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-4">No consumer bookings yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
