import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSun, FaMoon, FaGoogle, FaFacebook } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';

function Login() {
  // State to manage the theme (light or dark)
  const [theme, setTheme] = useState('light');
  // State to manage form data (email and password)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { login } = useAuth(); // Get login function from AuthContext
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

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function to handle form submission (login)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login request to the backend
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      const { token, user } = response.data;
      // Update auth state with token and role
      login(token, user.role);
      toast.success('Logged in successfully!');
      // Redirect based on user role
      setTimeout(() => {
        switch (user.role) {
          case 'admin':
            navigate('/admin-dashboard');
            break;
          case 'department_head':
            navigate('/department-head-dashboard');
            break;
          case 'manager':
            navigate('/manager-dashboard');
            break;
          case 'supervisor':
            navigate('/supervisor-dashboard');
            break;
          case 'volunteer':
            navigate('/volunteer-dashboard');
            break;
          default:
            navigate('/user-dashboard'); // Default dashboard for 'user' role
        }
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-300 bg-black"
      style={{
        backgroundImage: `url('/Event.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/80 z-0"></div>
      <div className="relative z-10 w-full max-w-md mx-auto">
        {/* Header with theme toggle */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <h1 className="text-4xl font-bold text-white">
              EUNOIA
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
            >
              {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
            </button>
          </div>
        </header>
        {/* Welcome message */}
        <h2 className="text-2xl font-bold text-white mb-6">
          Welcome back!
        </h2>
        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Enter email"
              required
            />
          </div>
          <div>
            <label className="block text-white font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Enter password"
              required
            />
          </div>
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-gray-400 hover:underline text-sm"
            >
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold"
          >
            Sign In
          </button>
        </form>
        {/* Divider and social login options */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-600"></div>
          <span className="mx-4 text-gray-400 text-sm">OR CONTINUE WITH</span>
          <div className="flex-grow border-t border-gray-600"></div>
        </div>
        <div className="flex justify-center space-x-4">
          <button className="p-3 bg-gray-800 rounded-lg text-white hover:bg-gray-700 transition-colors">
            <FaGoogle size={20} />
          </button>
          <button className="p-3 bg-gray-800 rounded-lg text-white hover:bg-gray-700 transition-colors">
            <FaFacebook size={20} />
          </button>
        </div>
        {/* Sign-up link */}
        <div className="mt-6 text-center">
          <Link
            to="/signup"
            className="text-gray-400 hover:underline"
          >
            Don’t have an account? Sign Up
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

export default Login;