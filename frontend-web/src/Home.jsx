import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaMapMarkerAlt, FaSun, FaMoon, FaSignOutAlt } from 'react-icons/fa';
import {
  FaMusic,
  FaGlassCheers,
  FaTheaterMasks,
  FaGift,
  FaHeart,
  FaPaintBrush,
  FaBriefcase,
  FaUtensils,
} from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';
import { useAuth } from './AuthContext';

function Home() {
  const [theme, setTheme] = useState('light');
  const [searchQuery, setSearchQuery] = useState('');
  const { isAuthenticated, userRole, logout } = useAuth();
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

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  // Dummy event data
  const events = [
    {
      id: 1,
      title: "Event 1",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1974&auto=format&fit=crop",
      description: "A vibrant music festival featuring top artists.",
      date: "2025-04-01",
    },
    {
      id: 2,
      title: "Event 2",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
      description: "A food and drink expo with local vendors.",
      date: "2025-04-02",
    },
  ];

  // Filter events based on search query
  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Category data with icons
  const categories = [
    { name: "Music", icon: <FaMusic /> },
    { name: "Nightlife", icon: <FaGlassCheers /> },
    { name: "Performing & Visual Arts", icon: <FaTheaterMasks /> },
    { name: "Holidays", icon: <FaGift /> },
    { name: "Dating", icon: <FaHeart /> },
    { name: "Hobbies", icon: <FaPaintBrush /> },
    { name: "Business", icon: <FaBriefcase /> },
    { name: "Food & Drink", icon: <FaUtensils /> },
  ];

  return (
    <div
      className="min-h-screen transition-colors duration-300 relative"
      style={{
        backgroundImage: `url('/Event.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-primary-900/70 z-0"></div>

      {/* Content Wrapper */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center p-6 bg-white dark:bg-neutral-800 shadow-lg">
          <div className="flex items-center">
            <h1 className="text-3xl font-extrabold text-primary-500 dark:text-secondary-500">
              Smart Event Manager
            </h1>
            <div className="ml-6 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-500 dark:text-secondary-500" />
              <input
                type="text"
                placeholder="Search events"
                className="pl-10 p-3 border border-primary-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-primary-900 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-secondary-500 dark:focus:ring-secondary-400 placeholder-neutral-400 dark:placeholder-neutral-500"
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search events"
              />
            </div>
          </div>
          <div className="flex items-center mt-4 md:mt-0">
            <span className="mr-4 flex items-center text-primary-700 dark:text-neutral-50">
              <FaMapMarkerAlt className="mr-1" /> Bangalore
            </span>
            <ul className="flex space-x-4">
              <li>
                <a
                  href="#"
                  className="text-primary-700 dark:text-neutral-50 hover:text-secondary-500 dark:hover:text-secondary-400 transition-colors"
                >
                  Contact Sales
                </a>
              </li>
              <li>
                <Link
                  to="/create-event"
                  className="text-primary-700 dark:text-neutral-50 hover:text-secondary-500 dark:hover:text-secondary-400 transition-colors"
                >
                  Create Events
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary-700 dark:text-neutral-50 hover:text-secondary-500 dark:hover:text-secondary-400 transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary-700 dark:text-neutral-50 hover:text-secondary-500 dark:hover:text-secondary-400 transition-colors"
                >
                  Find my tickets
                </a>
              </li>
              {isAuthenticated ? (
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-primary-700 dark:text-neutral-50 hover:text-secondary-500 dark:hover:text-secondary-400 transition-colors flex items-center"
                  >
                    Log Out <FaSignOutAlt className="ml-1" />
                  </button>
                </li>
              ) : (
                <>
                  <li>
                    <Link
                      to="/login"
                      className="text-primary-700 dark:text-neutral-50 hover:text-secondary-500 dark:hover:text-secondary-400 transition-colors"
                    >
                      Log In
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/signup"
                      className="text-primary-700 dark:text-neutral-50 hover:text-secondary-500 dark:hover:text-secondary-400 transition-colors"
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <button
              onClick={toggleTheme}
              className="ml-4 p-2 rounded-full bg-primary-500 dark:bg-secondary-500 text-white hover:bg-primary-700 dark:hover:bg-secondary-600 transition-colors"
            >
              {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
            </button>
          </div>
        </div>

        {/* Category Section */}
        <div className="mt-12 flex flex-wrap justify-center gap-4 px-6">
          {categories.map(category => (
            <div
              key={category.name}
              className="p-6 bg-white dark:bg-neutral-800 shadow-lg rounded-lg text-center transform hover:scale-105 transition-transform duration-300"
            >
              <span className="block text-3xl text-primary-500 dark:text-secondary-500 mb-2">
                {category.icon}
              </span>
              <span className="block text-sm font-medium text-primary-900 dark:text-neutral-50">
                {category.name}
              </span>
            </div>
          ))}
        </div>

        {/* Event Filter Section */}
        <div className="mt-12 flex justify-center flex-wrap gap-3 px-6">
          {["All", "For you", "Online", "Today", "This weekend", "Free", "Music", "Food & Drink"].map(
            filter => (
              <button
                key={filter}
                className="px-6 py-3 bg-white dark:bg-neutral-800 border-b-4 border-primary-500 dark:border-secondary-500 text-primary-500 dark:text-secondary-500 font-semibold rounded-lg hover:bg-primary-500 dark:hover:bg-secondary-500 hover:text-white dark:hover:text-neutral-900 transition-all duration-300"
                onClick={() => console.log("Filter selected:", filter)}
              >
                {filter}
              </button>
            )
          )}
        </div>

        {/* Trending Events Section */}
        <div className="mt-12 px-6">
          <h2 className="text-4xl font-extrabold text-center text-white dark:text-neutral-50 mb-8 drop-shadow-lg">
            Top Trending Events
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {filteredEvents.length > 0 ? (
              filteredEvents.map(event => (
                <div
                  key={event.id}
                  className="bg-white dark:bg-neutral-800 shadow-xl rounded-lg p-6 w-full sm:w-80 transform hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-2xl font-semibold text-primary-900 dark:text-neutral-50 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-sm text-primary-700 dark:text-neutral-300 mb-3">
                    {event.description}
                  </p>
                  <p className="text-sm text-primary-500 dark:text-neutral-400 mb-4">
                    {event.date}
                  </p>
                  <Link
                    to={`/register-event/${event.id}`}
                    className="inline-block px-6 py-2 bg-secondary-500 text-primary-900 rounded-lg hover:bg-secondary-600 transition-colors font-semibold"
                  >
                    Register
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-center text-white dark:text-neutral-50 text-lg drop-shadow-lg">
                No events found matching your search.
              </p>
            )}
          </div>
        </div>

        {/* Personalization Section */}
        <div className="mt-12 px-6 text-center">
          <h2 className="text-4xl font-extrabold text-white dark:text-neutral-50 mb-4 drop-shadow-lg">
            Let’s Make It Personal
          </h2>
          <p className="text-lg text-white dark:text-neutral-300 mb-6 drop-shadow-lg">
            Select your interests to get event suggestions based on what you love
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Comedy",
              "Food",
              "Education",
              "Pop",
              "Design",
              "R&B",
              "Hip Hop",
              "Film",
              "Personal Health",
              "Blues & Jazz",
            ].map(interest => (
              <button
                key={interest}
                className="px-6 py-3 bg-white dark:bg-neutral-800 border border-primary-300 dark:border-neutral-600 rounded-lg text-primary-700 dark:text-neutral-50 hover:bg-primary-500 dark:hover:bg-secondary-500 hover:text-white dark:hover:text-neutral-900 transition-all duration-300"
                onClick={() => console.log("Interest selected:", interest)}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <Footer />
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

export default Home;