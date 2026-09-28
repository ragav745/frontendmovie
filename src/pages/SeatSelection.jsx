import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Seat from '../components/Seat';

const rows = ['A', 'B', 'C', 'D'];
const columns = [1, 2, 3, 4, 5, 6];

function SeatSelection() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedShow = location.state?.selectedShow;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState(['A2', 'B4', 'C3', 'D5']);

  useEffect(() => {
    if (!selectedShow) {
      navigate('/movies');
    }
  }, [selectedShow, navigate]);

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) return;

    setSelectedSeats((prev) => {
      if (prev.includes(seat)) {
        return prev.filter((item) => item !== seat);
      }

      return [...prev, seat];
    });
  };

  const ticketPrice = selectedShow?.ticketPrice || 180;
  const totalAmount = selectedSeats.length * ticketPrice;

  const handleConfirm = () => {
    if (!selectedSeats.length) return;

    navigate('/booking-confirmation', {
      state: {
        selectedSeats,
        totalAmount,
        ticketPrice,
        movieTitle: selectedShow.movie?.title,
        movieId: selectedShow.movie?._id,
        theatreName: selectedShow.theatre?.name,
        theatreId: selectedShow.theatre?._id,
        showId: selectedShow._id,
        showTime: selectedShow.time,
        selectedDate: selectedShow.date
      }
    });
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Seat Selection</h2>

      <div className="alert alert-light border">
        <strong>{selectedShow?.movie?.title || 'Movie'}</strong>
        <span className="ms-2">{selectedShow?.theatre?.name || 'Theatre'} • {selectedShow?.date} • {selectedShow?.time}</span>
      </div>

      <div className="card shadow-sm border-0 p-4">
        <div className="seat-layout">
          <div className="screen text-center mb-3">Screen</div>

          {rows.map((row) => (
            <div className="seat-row" key={row}>
              {columns.map((col) => {
                const seat = `${row}${col}`;
                return (
                  <Seat
                    key={seat}
                    seat={seat}
                    isSelected={selectedSeats.includes(seat)}
                    isBooked={bookedSeats.includes(seat)}
                    onClick={toggleSeat}
                  />
                );
              })}
            </div>
          ))}
        </div>

        <div className="mt-4 row g-3">
          <div className="col-md-6">
            <div className="alert alert-light border">
              <strong>Selected Seats:</strong> {selectedSeats.length ? selectedSeats.join(', ') : 'No seats selected'}
            </div>
          </div>

          <div className="col-md-6">
            <div className="alert alert-light border">
              <strong>Number of Tickets:</strong> {selectedSeats.length}
            </div>
          </div>

          <div className="col-md-6">
            <div className="alert alert-light border">
              <strong>Ticket Price:</strong> ₹{ticketPrice}
            </div>
          </div>

          <div className="col-md-6">
            <div className="alert alert-light border">
              <strong>Total Amount:</strong> ₹{totalAmount}
            </div>
          </div>
        </div>

        <button className="btn btn-warning mt-3" onClick={handleConfirm} disabled={!selectedSeats.length}>
          Confirm Seats
        </button>
      </div>
    </div>
  );
}

export default SeatSelection;
