// Represents one seat in the seat-selection layout.
function Seat({ seat, isSelected, isBooked, onClick }) {
  const seatClass = isBooked
    ? 'seat booked'
    : isSelected
      ? 'seat selected'
      : 'seat available';

  return (
    <button
      type="button"
      className={seatClass}
      disabled={isBooked}
      onClick={() => onClick(seat)}
      title={seat}
    >
      {seat}
    </button>
  );
}

export default Seat;
