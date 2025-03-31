import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSun, FaMoon, FaSignOutAlt } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../components/AuthContext';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/events';

function CreateEvent() {
  const [theme, setTheme] = useState('light');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    category: 'Other',
  });
  const { logout, userRole, token } = useAuth();
  const navigate = useNavigate();

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_URL, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      toast.success('Event created successfully!');
      setFormData({
        title: '',
        description: '',
        date: '',
        location: '',
        category: 'Other',
      });
      setTimeout(() => {
        navigate('/events');
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error creating event');
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  if (userRole !== 'manager') {
    return null;
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 transition-colors duration-300 bg-primary-500/80 relative"
      style={{
        backgroundImage: `url('/Event.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-primary-900/80 z-0"></div>
      <div className="relative z-10 w-full max-w-md mx-auto p-8 bg-neutral-100 dark:bg-neutral-800 rounded-lg shadow-lg">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <h1 className="text-3xl font-extrabold text-primary-500 dark:text-secondary-500">
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-primary-900 dark:text-neutral-50 font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 border border-primary-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-primary-900 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-secondary-500 dark:focus:ring-secondary-400"
              placeholder="Enter event title"
              required
            />
          </div>
          <div>
            <label className="block text-primary-900 dark:text-neutral-50 font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border border-primary-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-primary-900 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-secondary-500 dark:focus:ring-secondary-400"
              placeholder="Enter event description"
              required
            />
          </div>
          <div>
            <label className="block text-primary-900 dark:text-neutral-50 font-medium mb-1">
              Date
            </label>
            <input
              type="datetime-local"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 border border-primary-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-primary-900 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-secondary-500 dark:focus:ring-secondary-400"
              required
            />
          </div>
          <div>
            <label className="block text-primary-900 dark:text-neutral-50 font-medium mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-3 border border-primary-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-primary-900 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-secondary-500 dark:focus:ring-secondary-400"
              placeholder="Enter event location"
              required
            />
          </div>
          <div>
            <label className="block text-primary-900 dark:text-neutral-50 font-medium mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 border border-primary-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-primary-900 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-secondary-500 dark:focus:ring-secondary-400"
            >
              <option value="Music">Music</option>
              <option value="Business">Business</option>
              <option value="Tech">Tech</option>
              <option value="Food">Food</option>
              <option value="Comedy">Comedy</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-primary-500 dark:bg-secondary-500 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-secondary-600 transition-colors font-semibold"
          >
            Create Event
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link
            to="/events"
            className="text-primary-500 dark:text-secondary-500 hover:underline"
          >
            Back to Events
          </Link>
        </div>
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

export default CreateEvent;