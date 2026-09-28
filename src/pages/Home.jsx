import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <section className="hero-section">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <p className="text-warning fw-semibold mb-3">Now Showing</p>
              <h1 className="display-4 fw-bold mb-3">Book tickets for the latest movies.</h1>
              <p className="lead text-muted mb-4">
                Discover blockbuster films, reserve your seats, and enjoy a smooth movie booking experience.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link to="/movies" className="btn btn-warning btn-lg">
                  Browse Movies
                </Link>
                <Link to="/login" className="btn btn-outline-dark btn-lg">
                  Login
                </Link>
              </div>
            </div>
            <div className="col-lg-6 mt-4 mt-lg-0">
              <div className="hero-poster">
                <img
                  src="https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?auto=format&fit=crop&w=900&q=80"
                  alt="Movie theater"
                  className="img-fluid rounded shadow"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;
