import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSun, FaMoon, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../components/AuthContext';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/events';

function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState('light');
  const [categoryFilter, setCategoryFilter] = useState('');
  const { logout, userRole, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, [categoryFilter]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        params: { category: categoryFilter },
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setEvents(response.data);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error fetching events');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (eventId) => {
    try {
      const response = await axios.post(`${API_URL}/${eventId}/register`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      toast.success('Registered successfully!');
      fetchEvents();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error registering for event');
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const response = await axios.delete(`${API_URL}/${eventId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        toast.success('Event deleted successfully!');
        fetchEvents();
      } catch (error) {
        toast.error(error.response?.data?.error || 'Error deleting event');
      }
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <div
      className="min-h-screen flex flex-col p-4 transition-colors duration-300 bg-primary-500/80 relative"
      style={{
        backgroundImage: `url('/Event.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-primary-900/80 z-0"></div>
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <h1 className="text-3xl font-extrabold text-white drop-shadow-lg">
              Smart Event Manager
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={toggleTheme} className="p-2 rounded-full bg-primary-500 dark:bg-secondary-500 text-white">
              {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
            </button>
            <button onClick={handleLogout} className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors">
              <FaSignOutAlt size={20} />
            </button>
          </div>
        </header>
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Events</h2>
          {userRole === 'manager' && (
            <Link
              to="/create-event"
              className="px-4 py-2 bg-primary-500 dark:bg-secondary-500 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-secondary-600 transition-colors font-semibold"
            >
              Create Event
            </Link>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-white font-medium mb-2">
            Filter by Category
          </label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full p-3 border border-primary-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-primary-900 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-secondary-500 dark:focus:ring-secondary-400"
          >
            <option value="">All Categories</option>
            <option value="Music">Music</option>
            <option value="Business">Business</option>
            <option value="Tech">Tech</option>
            <option value="Food">Food</option>
            <option value="Comedy">Comedy</option>
            <option value="Other">Other</option>
          </select>
        </div>
        {loading ? (
          <div className="flex justify-center items-center">
            <p className="text-white">Loading...</p>
          </div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map(event => (
              <div
                key={event._id}
                className="p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-lg"
              >
                <h3 className="text-xl font-semibold text-primary-900 dark:text-neutral-50 mb-2">
                  {event.title}
                </h3>
                <p className="text-primary-700 dark:text-neutral-300 mb-2">
                  {event.description}
                </p>
                <p className="text-primary-700 dark:text-neutral-300 mb-2">
                  Date: {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="text-primary-700 dark:text-neutral-300 mb-2">
                  Location: {event.location}
                </p>
                <p className="text-primary-700 dark:text-neutral-300 mb-2">
                  Category: {event.category}
                </p>
                <p className="text-primary-700 dark:text-neutral-300 mb-2">
                  Manager: {event.manager.name} ({event.manager.email})
                </p>
                <p className="text-primary-700 dark:text-neutral-300 mb-4">
                  Attendees: {event.attendees.length}
                </p>
                {userRole === 'user' && (
                  <button
                    onClick={() => handleRegister(event._id)}
                    className="w-full p-3 bg-primary-500 dark:bg-secondary-500 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-secondary-600 transition-colors font-semibold"
                  >
                    Register
                  </button>
                )}
                {userRole === 'manager' && event.manager._id === token && (
                  <button
                    onClick={() => handleDeleteEvent(event._id)}
                    className="w-full p-3 mt-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-white">No events found.</p>
        )}
        {userRole === 'admin' && (
          <div className="mt-6 text-center">
            <Link
              to="/admin-dashboard"
              className="text-white hover:underline font-semibold"
            >
              Back to Dashboard
            </Link>
          </div>
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        theme={theme}
      />
    </div>
  );
}

export default EventList;