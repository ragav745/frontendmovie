import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

function EditMovie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: '',
    language: '',
    duration: '',
    releaseDate: '',
    poster: '',
    rating: '',
    cast: '',
    trailerLink: '',
    status: 'Now Showing'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get(`/movies/${id}`).then((response) => {
      const movie = response.data;
      setFormData({
        title: movie.title || '',
        description: movie.description || '',
        genre: movie.genre || '',
        language: movie.language || '',
        duration: movie.duration || '',
        releaseDate: movie.releaseDate || '',
        poster: movie.poster || '',
        rating: movie.rating || '',
        cast: (movie.cast || []).join(', '),
        trailerLink: movie.trailerLink || '',
        status: movie.status || 'Now Showing'
      });
    }).catch((err) => {
      setError(err.response?.data?.message || 'Unable to load movie.');
    }).finally(() => {
      setLoading(false);
    });
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    setSaving(true);

    api.put(`/movies/${id}`, {
      ...formData,
      duration: Number(formData.duration),
      rating: Number(formData.rating),
      cast: formData.cast.split(',').map((actor) => actor.trim()).filter(Boolean)
    }, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => {
      navigate('/admin');
    }).catch((err) => {
      setError(err.response?.data?.message || 'Unable to update movie.');
    }).finally(() => {
      setSaving(false);
    });
  };

  if (loading) {
    return <div className="container py-5">Loading movie...</div>;
  }

  return (
    <div className="container py-5">
      <div className="card shadow-sm border-0 p-4 mx-auto" style={{ maxWidth: '700px' }}>
        <h2 className="mb-4">Edit Movie</h2>
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Title</label>
              <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Genre</label>
              <input type="text" className="form-control" name="genre" value={formData.genre} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Language</label>
              <input type="text" className="form-control" name="language" value={formData.language} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Duration (minutes)</label>
              <input type="number" className="form-control" name="duration" value={formData.duration} onChange={handleChange} min="1" required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Release date</label>
              <input type="date" className="form-control" name="releaseDate" value={formData.releaseDate} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Rating</label>
              <input type="number" className="form-control" name="rating" value={formData.rating} onChange={handleChange} min="0" max="10" step="0.1" required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Cast</label>
              <input type="text" className="form-control" name="cast" value={formData.cast} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Poster image URL</label>
              <input type="url" className="form-control" name="poster" value={formData.poster} onChange={handleChange} required />
            </div>
            <div className="col-md-12">
              <label className="form-label">Trailer URL</label>
              <input type="url" className="form-control" name="trailerLink" value={formData.trailerLink} onChange={handleChange} required />
            </div>
            <div className="col-md-12">
              <label className="form-label">Description</label>
              <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} rows="3" required />
            </div>
            <div className="col-md-12">
              <label className="form-label">Status</label>
              <select className="form-select" name="status" value={formData.status} onChange={handleChange} required>
                <option value="Now Showing">Now Showing</option>
                <option value="Coming Soon">Coming Soon</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-warning mt-4" disabled={saving}>
            {saving ? 'Updating...' : 'Update Movie'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditMovie;
