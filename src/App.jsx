import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SelectShow from './pages/SelectShow';
import SeatSelection from './pages/SeatSelection';
import BookingConfirmation from './pages/BookingConfirmation';
import MyBookings from './pages/MyBookings';
import AdminDashboard from './pages/AdminDashboard';
import AddMovie from './pages/AddMovie';
import EditMovie from './pages/EditMovie';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="app-shell">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin-login" element={<Login adminOnly />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/select-show"
              element={
                <ProtectedRoute>
                  <SelectShow />
                </ProtectedRoute>
              }
            />
            <Route
              path="/seat-selection"
              element={
                <ProtectedRoute>
                  <SeatSelection />
                </ProtectedRoute>
              }
            />
            <Route
              path="/booking-confirmation"
              element={
                <ProtectedRoute>
                  <BookingConfirmation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-bookings"
              element={
                <ProtectedRoute>
                  <MyBookings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/add-movie"
              element={
                <AdminRoute>
                  <AddMovie />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/edit-movie/:id"
              element={
                <AdminRoute>
                  <EditMovie />
                </AdminRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
