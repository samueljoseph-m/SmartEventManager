import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';

// Introductory page for Eunoia, inspired by Angel Studios
function Intro() {
  // State to manage the theme (light or dark)
  const [theme, setTheme] = useState('light');

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

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-300 bg-black"
      style={{
        backgroundImage: `url('/Event.webp')`, // Use the same background as other pages
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/80 z-0"></div>
      <div className="relative z-10 w-full max-w-md mx-auto text-center">
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
        {/* Tagline */}
        <p className="text-xl text-white mb-8">
          Plan and manage events with beautiful thinking
        </p>
        {/* Buttons */}
        <div className="space-y-4">
          <Link
            to="/signup"
            className="block w-full p-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="block w-full p-4 bg-transparent border border-gray-500 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold"
          >
            I Already Have an Account
          </Link>
        </div>
        {/* Terms of Use */}
        <p className="text-sm text-gray-400 mt-8">
          By using this app, you agree to the terms of use and privacy policy.
        </p>
      </div>
    </div>
  );
}

export default Intro;