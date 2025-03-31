import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSun, FaMoon, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../components/AuthContext';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState('light');
  const { logout, isAuthenticated, userRole, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      fetchUsers();
    }
  }, [isAuthenticated]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAvailability = async (id, availability) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, { availability }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      toast.success('Availability updated!');
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error updating availability');
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await axios.delete(`${API_URL}/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        toast.success('User deleted successfully!');
        fetchUsers();
      } catch (error) {
        toast.error(error.response?.data?.error || 'Error deleting user');
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
      <div className="relative z-10 w-full max-w-4xl mx-auto p-6 bg-neutral-100 dark:bg-neutral-800 rounded-lg shadow-lg">
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
        <h2 className="text-2xl font-bold text-center text-primary-900 dark:text-neutral-50 mb-6">
          Users
        </h2>
        {loading ? (
          <div className="flex justify-center items-center">
            <ClipLoader color={theme === 'light' ? '#3B82F6' : '#FBBF24'} size={50} />
          </div>
        ) : users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-primary-500 dark:bg-secondary-500 text-white">
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Skills</th>
                  <th className="p-3">Availability</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id} className="border-b dark:border-neutral-700">
                    <td className="p-3 text-primary-900 dark:text-neutral-50">{user.name}</td>
                    <td className="p-3 text-primary-900 dark:text-neutral-50">{user.email}</td>
                    <td className="p-3 text-primary-900 dark:text-neutral-50">{user.role}</td>
                    <td className="p-3 text-primary-900 dark:text-neutral-300">{user.skills.join(', ') || 'None'}</td>
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={user.availability}
                        onChange={(e) => handleUpdateAvailability(user._id, e.target.checked)}
                        className="h-5 w-5 text-primary-500 dark:text-secondary-500"
                      />
                    </td>
                    <td className="p-3">
                      <button
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors font-semibold transform hover:scale-105"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-primary-700 dark:text-neutral-300">
            No users found.
          </p>
        )}
        <div className="mt-6 text-center">
          <Link
            to="/admin-dashboard"
            className="text-primary-500 dark:text-secondary-500 hover:underline font-semibold"
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

export default UserList;