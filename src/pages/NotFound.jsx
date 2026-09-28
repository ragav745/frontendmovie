import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="container py-5 text-center">
      <h1 className="display-4">404</h1>
      <p className="lead">The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-warning">
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
