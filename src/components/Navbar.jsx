import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          MovieBook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/movies">
                Movies
              </Link>
            </li>
            {user && user.role === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">
                  Admin
                </Link>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-2">
            {user ? (
              <>
                <Link className="nav-link text-white" to="/my-bookings">
                  My Bookings
                </Link>
                <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-light btn-sm">
                  Login
                </Link>
                <Link to="/admin-login" className="btn btn-outline-warning btn-sm">
                  Owner Login
                </Link>
                <Link to="/signup" className="btn btn-warning btn-sm">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
