import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

function BookingConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [saveError, setSaveError] = useState('');
  const [isSaving, setIsSaving] = useState(true);
  const hasSaved = useRef(false);
  const {
    selectedSeats = [],
    totalAmount = 0,
    ticketPrice = 0,
    movieTitle = 'Movie',
    movieId,
    theatreName = 'Theatre',
    theatreId,
    showId,
    showTime = 'Show Time',
    selectedDate = 'Date',
  } = location.state || {};

  const bookingId = `MB-${Date.now().toString().slice(-6)}`;

  useEffect(() => {
    if (hasSaved.current || !token || !movieId || !theatreId || !showId || !selectedSeats.length) return;

    hasSaved.current = true;
    api.post('/bookings', {
      movie: movieId,
      theatre: theatreId,
      show: showId,
      seats: selectedSeats
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .catch((error) => {
        hasSaved.current = false;
        setSaveError(error.response?.data?.message || 'Unable to save your booking.');
      })
      .finally(() => setIsSaving(false));
  }, [movieId, theatreId, showId, selectedSeats, token]);

  const handleBooking = () => {
    navigate('/my-bookings');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container py-5 booking-confirmation-wrap">
      <div className="card shadow-sm border-0 p-4 mx-auto ticket-container" style={{ maxWidth: '760px' }}>
        <h2 className="mb-4 text-center">Booking Confirmation</h2>

        <div className="ticket-card mx-auto">
          <div className="ticket-header">
            <div>
              <p className="ticket-label">MovieBook</p>
              <h4>{movieTitle}</h4>
            </div>
            <span className="ticket-badge">Booked</span>
          </div>

          <div className="ticket-body row g-3">
            <div className="col-6">
              <span className="ticket-key">Booking ID</span>
              <div className="ticket-value">{bookingId}</div>
            </div>
            <div className="col-6">
              <span className="ticket-key">Theatre</span>
              <div className="ticket-value">{theatreName}</div>
            </div>
            <div className="col-6">
              <span className="ticket-key">Date</span>
              <div className="ticket-value">{selectedDate}</div>
            </div>
            <div className="col-6">
              <span className="ticket-key">Time</span>
              <div className="ticket-value">{showTime}</div>
            </div>
            <div className="col-6">
              <span className="ticket-key">Seats</span>
              <div className="ticket-value">{selectedSeats.join(', ') || 'N/A'}</div>
            </div>
            <div className="col-6">
              <span className="ticket-key">Tickets</span>
              <div className="ticket-value">{selectedSeats.length}</div>
            </div>
            <div className="col-6">
              <span className="ticket-key">Price</span>
              <div className="ticket-value">₹{ticketPrice}</div>
            </div>
            <div className="col-6">
              <span className="ticket-key">Total</span>
              <div className="ticket-value">₹{totalAmount}</div>
            </div>
          </div>

          <div className="ticket-footer">
            <span>Enjoy your show</span>
            <span>Seat: {selectedSeats.join(', ') || 'N/A'}</span>
          </div>
        </div>

        <div className="d-flex gap-2 mt-4 print-hidden">
          <button className="btn btn-warning flex-fill" onClick={handlePrint}>
            {isSaving ? 'Saving Ticket...' : 'Print Ticket'}
          </button>
          <button className="btn btn-outline-dark flex-fill" onClick={handleBooking}>
            My Bookings
          </button>
        </div>
        {saveError && <div className="alert alert-danger mt-3 mb-0">{saveError}</div>}
      </div>
    </div>
  );
}

export default BookingConfirmation;
