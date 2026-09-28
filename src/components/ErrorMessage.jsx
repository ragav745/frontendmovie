// Displays a styled error message for failed form or API actions.
function ErrorMessage({ message }) {
  if (!message) return null;

  return <div className="alert alert-danger">{message}</div>;
}

export default ErrorMessage;
