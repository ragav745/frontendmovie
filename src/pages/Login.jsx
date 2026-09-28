import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

function Login({ adminOnly = false }) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await api.post('/auth/login', formData);
      const userData = {
        _id: response.data._id,
        name: response.data.name,
        email: response.data.email,
        role: response.data.role
      };

      if (adminOnly && userData.role !== 'admin') {
        setError('This login is for the owner/admin account only.');
        return;
      }

      login(userData, response.data.token);
      navigate(userData.role === 'admin' ? '/admin' : '/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm border-0 p-4">
            <h2 className="mb-4 text-center">{adminOnly ? 'Owner Login' : 'Consumer Login'}</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-warning w-100">
                Login
              </button>
            </form>

            {adminOnly ? (
              <p className="mt-3 text-center mb-0">
                Consumer? <Link to="/login">Go to consumer login</Link>
              </p>
            ) : (
              <p className="mt-3 text-center mb-0">
                New user? <Link to="/signup">Create an account</Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
