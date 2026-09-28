import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingCard from '../components/BookingCard';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

function MyBookings() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const response = await api.get('/bookings/my', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(response.data);
      } catch (requestError) {
        if (requestError.response?.status === 401) {
          logout();
          navigate('/login', { state: { message: 'Your session expired. Please log in again.' } });
          return;
        }
        setError(requestError.response?.data?.message || 'Unable to load your bookings.');
      } finally {
        setLoading(false);
      }
    };

    if (token) loadBookings();
  }, [logout, navigate, token]);

  return (
    <div className="container py-5">
      <h2 className="mb-4">My Bookings</h2>
      {loading && <p>Loading bookings...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && !bookings.length && <div className="alert alert-info">No bookings found.</div>}
      {!loading && !error && bookings.map((booking) => <BookingCard key={booking._id} booking={booking} />)}
    </div>
  );
}

export default MyBookings;
