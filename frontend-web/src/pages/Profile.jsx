import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSun, FaMoon, FaSignOutAlt } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../components/AuthContext';
import axios from 'axios';

// API URL for fetching and updating the user profile
const API_URL = 'http://localhost:5000/api/users/profile';

function Profile() {
  // State to manage the theme (light or dark)
  const [theme, setTheme] = useState('light');
  // State to manage user profile data
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: { street: '', city: '', country: '' },
    skills: [],
  });
  // State to manage loading status
  const [loading, setLoading] = useState(false);
  const { logout, token } = useAuth(); // Get auth data from context
  const navigate = useNavigate(); // Hook for navigation

  // Effect to fetch the user's profile on component mount
  useEffect(() => {
    fetchProfile();
  }, []);

  // Function to fetch the user's profile from the backend
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setProfile(response.data);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error fetching profile');
    } finally {
      setLoading(false);
    }
  };

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

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      // Handle nested address fields
      const addressField = name.split('.')[1];
      setProfile(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Function to handle skills input (comma-separated)
  const handleSkillsChange = (e) => {
    const skillsArray = e.target.value.split(',').map(skill => skill.trim());
    setProfile(prev => ({
      ...prev,
      skills: skillsArray,
    }));
  };

  // Function to handle form submission (update profile)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(API_URL, profile, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setProfile(response.data);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error updating profile');
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
      {/* Background overlay */}
      <div className="absolute inset-0 bg-primary-900/80 z-0"></div>
      <div className="relative z-10 w-full max-w-md mx-auto p-8 bg-neutral-100 dark:bg-neutral-800 rounded-lg shadow-lg">
        {/* Header with app name and theme/logout buttons */}
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
        {/* Profile form */}
        {loading ? (
          <div className="flex justify-center items-center">
            <p className="text-primary-900 dark:text-neutral-50">Loading...</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center text-primary-900 dark:text-neutral-50 mb-6">
              Your Profile
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-primary-900 dark:text-neutral-50 font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-primary-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-primary-900 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-secondary-500 dark:focus:ring-secondary-400"
                  placeholder="Enter name"
                  required
                />
              </div>
              <div>
                <label className="block text-primary-900 dark:text-neutral-50 font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  className="w-full p-3 border border-primary-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-primary-900 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-secondary-500 dark:focus:ring-secondary-400"
                  disabled
                />
              </div>
              <div>
                <label className="block text-primary-900 dark:text-neutral-50 font-medium mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={profile.phoneNumber || ''}
                  onChange={handleChange}
                  className="w-full p-3 border border-primary-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-primary-900 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-secondary-500 dark:focus:ring-secondary-400"
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label className="block text-primary-900 dark:text-neutral-50 font-medium mb-1">
                  Address - Street
                </label>
                <input
                  type="text"
                  name="address.street"
                  value={profile.address.street || ''}
                  onChange={handleChange}
                  className="w-full p-3 border border-primary-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-primary-900 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-secondary-500 dark:focus:ring-secondary-400"
                  placeholder="Enter street"
                />
              </div>
              <div>
                <label className="block text-primary-900 dark:text-neutral-50 font-medium mb-1">
                  Address - City
                </label>
                <input
                  type="text"
                  name="address.city"
                  value={profile.address.city || ''}
                  onChange={handleChange}
                  className="w-full p-3 border border-primary-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-primary-900 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-secondary-500 dark:focus:ring-secondary-400"
                  placeholder="Enter city"
                />
              </div>
              <div>
                <label className="block text-primary-900 dark:text-neutral-50 font-medium mb-1">
                  Address - Country
                </label>
                <input
                  type="text"
                  name="address.country"
                  value={profile.address.country || ''}
                  onChange={handleChange}
                  className="w-full p-3 border border-primary-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-primary-900 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-secondary-500 dark:focus:ring-secondary-400"
                  placeholder="Enter country"
                />
              </div>
              <div>
                <label className="block text-primary-900 dark:text-neutral-50 font-medium mb-1">
                  Skills (comma-separated)
                </label>
                <input
                  type="text"
                  name="skills"
                  value={profile.skills.join(', ')}
                  onChange={handleSkillsChange}
                  className="w-full p-3 border border-primary-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-primary-900 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-secondary-500 dark:focus:ring-secondary-400"
                  placeholder="e.g., JavaScript, React"
                />
              </div>
              <button
                type="submit"
                className="w-full p-3 bg-primary-500 dark:bg-secondary-500 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-secondary-600 transition-colors font-semibold"
              >
                Update Profile
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
          </>
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

export default Profile;