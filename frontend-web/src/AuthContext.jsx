// Import React hooks for creating and managing context
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context for authentication state
const AuthContext = createContext();

// AuthProvider component to wrap the app and provide auth state
export const AuthProvider = ({ children }) => {
  // State to track if the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // State to store the user's role (e.g., admin, user, manager)
  const [userRole, setUserRole] = useState(null);
  // State to store the JWT token
  const [token, setToken] = useState(null);

  // Effect to check for stored token and role on app load
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    if (storedToken && storedRole) {
      setToken(storedToken);
      setUserRole(storedRole);
      setIsAuthenticated(true);
    }
  }, []);

  // Function to handle user login
  const login = (token, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    setToken(token);
    setUserRole(role);
    setIsAuthenticated(true);
  };

  // Function to handle user logout
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
    setUserRole(null);
    setIsAuthenticated(false);
  };

  // Provide the auth state and functions to the app
  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the auth context
export const useAuth = () => useContext(AuthContext);