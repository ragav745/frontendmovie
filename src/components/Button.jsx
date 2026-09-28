// Reusable button component for consistent UI styling.
function Button({ text, type = 'button', className = 'btn btn-warning', onClick }) {
  return (
    <button type={type} className={className} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
