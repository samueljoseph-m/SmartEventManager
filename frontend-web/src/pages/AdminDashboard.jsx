import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSun, FaMoon, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../components/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminDashboard() {
  // State to manage the theme (light or dark)
  const [theme, setTheme] = useState('light');
  const { logout, userRole } = useAuth(); // Get auth data from context
  const navigate = useNavigate(); // Hook for navigation

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  // Restrict access to admin users only
  if (userRole !== 'admin') {
    return null;
  }

  return (
    <div
      className="min-h-screen flex flex-col p-6 transition-colors duration-300 bg-primary-500/80"
      style={{
        backgroundImage: `url('/Event.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-primary-900/80 z-0"></div>
      <div className="relative z-10">
        {/* Header with app name and theme/logout buttons */}
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
        <div className="flex-grow flex flex-col items-center justify-center">
          {/* Grid of admin actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              to="/create-user"
              className="p-8 bg-white dark:bg-neutral-800 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform duration-300"
            >
              <h2 className="text-2xl font-semibold text-primary-900 dark:text-neutral-50 mb-2">
                Create User
              </h2>
              <p className="text-primary-700 dark:text-neutral-300">
                Add a new user to the system
              </p>
            </Link>
            <Link
              to="/users"
              className="p-8 bg-white dark:bg-neutral-800 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform duration-300"
            >
              <h2 className="text-2xl font-semibold text-primary-900 dark:text-neutral-50 mb-2">
                User List
              </h2>
              <p className="text-primary-700 dark:text-neutral-300">
                View and manage all users
              </p>
            </Link>
            <Link
              to="/events"
              className="p-8 bg-white dark:bg-neutral-800 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform duration-300"
            >
              <h2 className="text-2xl font-semibold text-primary-900 dark:text-neutral-50 mb-2">
                Event List
              </h2>
              <p className="text-primary-700 dark:text-neutral-300">
                View all events
              </p>
            </Link>
            <Link
              to="/profile"
              className="p-8 bg-white dark:bg-neutral-800 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform duration-300"
            >
              <h2 className="text-2xl font-semibold text-primary-900 dark:text-neutral-50 mb-2">
                Profile
              </h2>
              <p className="text-primary-700 dark:text-neutral-300">
                View and edit your profile
              </p>
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
    </div>
  );
}

export default AdminDashboard;