import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSun, FaMoon, FaSignOutAlt } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../components/AuthContext';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

function CreateUser() {
  const [theme, setTheme] = useState('light');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    skills: [],
    availability: false,
  });
  const [errors, setErrors] = useState({});
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

  const validateForm = () => {
    const newErrors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    validateForm();
  };

  const handleSkillsChange = (e) => {
    const skillsArray = e.target.value.split(',').map(skill => skill.trim());
    setFormData(prev => ({
      ...prev,
      skills: skillsArray,
    }));
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the form?')) {
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'user',
        skills: [],
        availability: false,
      });
      setErrors({});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    try {
      const response = await axios.post(API_URL, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      toast.success('User created successfully!');
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'user',
        skills: [],
        availability: false,
      });
      setErrors({});
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error creating user');
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  if (userRole !== 'admin') {
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
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
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
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-primary-300 dark:border-neutral-600'} rounded-lg bg-neutral-50 dark:bg-neutral-700 text-primary-900 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-secondary-500 dark:focus:ring-secondary-400`}
              placeholder="Enter email"
              required
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-primary-900 dark:text-neutral-50 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full p-3 border ${errors.password ? 'border-red-500' : 'border-primary-300 dark:border-neutral-600'} rounded-lg bg-neutral-50 dark:bg-neutral-700 text-primary-900 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-secondary-500 dark:focus:ring-secondary-400`}
              placeholder="Enter password"
              required
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <div>
            <label className="block text-primary-900 dark:text-neutral-50 font-medium mb-1">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 border border-primary-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-primary-900 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-secondary-500 dark:focus:ring-secondary-400"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
            </select>
          </div>
          <div>
            <label className="block text-primary-900 dark:text-neutral-50 font-medium mb-1">
              Skills (comma-separated)
            </label>
            <input
              type="text"
              name="skills"
              value={formData.skills.join(', ')}
              onChange={handleSkillsChange}
              className="w-full p-3 border border-primary-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-primary-900 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-secondary-500 dark:focus:ring-secondary-400"
              placeholder="e.g., JavaScript, React"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="availability"
              checked={formData.availability}
              onChange={handleChange}
              className="h-5 w-5 text-primary-500 dark:text-secondary-500 border-primary-300 dark:border-neutral-600 rounded focus:ring-secondary-500 dark:focus:ring-secondary-400"
            />
            <label className="ml-2 text-primary-900 dark:text-neutral-50">
              Available
            </label>
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="w-full p-3 bg-primary-500 dark:bg-secondary-500 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-secondary-600 transition-colors font-semibold"
            >
              Create User
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="w-full p-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold"
            >
              Reset
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <Link
            to="/admin-dashboard"
            className="text-primary-500 dark:text-secondary-500 hover:underline"
          >
            Back to Dashboard
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

export default CreateUser;