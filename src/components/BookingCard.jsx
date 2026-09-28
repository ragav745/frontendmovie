// Displays a single booking summary card for booking history.
function BookingCard({ booking }) {
  return (
    <div className="card shadow-sm border-0 mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h5 className="card-title mb-1">{booking.movie?.title || booking.movieName || 'Movie'}</h5>
            <p className="mb-1 text-muted">{booking.theatre?.name || booking.theatreName || 'Theatre'}</p>
            <p className="mb-0 small text-muted">
              {booking.show?.date || booking.date} • {booking.show?.time || booking.time}
            </p>
          </div>
          <span className="badge bg-success">{booking.status || 'Confirmed'}</span>
        </div>

        <div className="mt-3 d-flex justify-content-between">
          <span>Seats: {booking.seats?.join(', ') || 'N/A'}</span>
          <strong>₹{booking.totalAmount || 0}</strong>
        </div>
      </div>
    </div>
  );
}

export default BookingCard;
