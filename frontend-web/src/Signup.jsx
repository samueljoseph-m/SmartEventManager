import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';

function Signup() {
  const [theme, setTheme] = useState('light');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup Attempt:', formData);
    // Placeholder for backend integration
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

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 bg-primary-500/80`}
      style={{
        backgroundImage: `url('/Event.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className={`w-full max-w-lg mx-auto p-6 ${theme === 'light' ? 'bg-neutral-100' : 'bg-neutral-800'} rounded-lg shadow-lg`}>
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-primary-500 dark:bg-secondary-500 text-white"
          >
            {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
          </button>
        </div>

        <h1 className="text-3xl font-extrabold text-primary-500 dark:text-secondary-500">Eunoia</h1>
        <h2 className="text-2xl font-bold text-center text-primary-900 dark:text-neutral-50 mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className={`w-full p-3 ${theme === 'light' ? 'text-primary-900 bg-neutral-50' : 'text-neutral-50 bg-neutral-700'} border ${theme === 'light' ? 'border-primary-300' : 'border-neutral-600'} rounded focus:outline-none focus:ring-2 focus:ring-secondary-500 dark:focus:ring-secondary-400 placeholder-neutral-400 dark:placeholder-neutral-500`}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className={`w-full p-3 ${theme === 'light' ? 'text-primary-900 bg-neutral-50' : 'text-neutral-50 bg-neutral-700'} border ${theme === 'light' ? 'border-primary-300' : 'border-neutral-600'} rounded focus:outline-none focus:ring-2 focus:ring-secondary-500 dark:focus:ring-secondary-400 placeholder-neutral-400 dark:placeholder-neutral-500`}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className={`w-full p-3 ${theme === 'light' ? 'text-primary-900 bg-neutral-50' : 'text-neutral-50 bg-neutral-700'} border ${theme === 'light' ? 'border-primary-300' : 'border-neutral-600'} rounded focus:outline-none focus:ring-2 focus:ring-secondary-500 dark:focus:ring-secondary-400 placeholder-neutral-400 dark:placeholder-neutral-500`}
          />
          <div className="flex justify-between gap-4">
            <Link to="/" className={`w-full p-3 border ${theme === 'light' ? 'border-primary-500 text-primary-500' : 'border-secondary-500 text-secondary-500'} rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors font-semibold text-center`}>
              Back
            </Link>
            <button
              type="submit"
              className={`w-full p-3 bg-secondary-500 text-primary-900 rounded hover:bg-secondary-600 transition-colors font-semibold`}
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="text-center">
          <Link to="/login" className={`${theme === 'light' ? 'text-primary-500' : 'text-secondary-500'} hover:underline font-semibold`}>
            Already have an account? Log In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;