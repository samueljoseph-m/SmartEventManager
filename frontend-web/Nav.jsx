import React from 'react';
import { Link } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';

function Nav({ theme, toggleTheme }) {
  return (
    <nav className="bg-white dark:bg-gray-800 p-4 shadow">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold text-primary-500 dark:text-white">
          Smart Event Manager
        </Link>
        <div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
          </button>
        </div>
      </div>
      <div className="container mx-auto mt-4">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-gray-800 dark:text-gray-200 hover:text-primary-500">
              Create User
            </Link>
          </li>
          <li>
            <Link to="/users" className="text-gray-800 dark:text-gray-200 hover:text-primary-500">
              View Users
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;