import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userData = await authService.getCurrentUser();
          if (userData) {
            setCurrentUser(userData);
            console.log('User authenticated:', userData.username);
            console.log('User roles:', userData.roles);
            
            // Only redirect to dashboard if we're on login or register page
            const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
            if (isAuthPage) {
              console.log('Redirecting authenticated user to dashboard');
              navigate('/dashboard', { replace: true });
            }
          } else {
            // Clear invalid authentication data
            console.log('Invalid user data, clearing auth');
            localStorage.removeItem('token');
            localStorage.removeItem('username');
          }
        } else {
          console.log('No token found in localStorage');
        }
      } catch (err) {
        console.error('Failed to initialize auth:', err);
        localStorage.removeItem('token');
        localStorage.removeItem('username');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [navigate, location.pathname]);

  const login = async (username, password) => {
    try {
      setError(null);
      setLoading(true);
      const data = await authService.login(username, password);
      
      // Store authentication data
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', username);
      
      // Set current user
      setCurrentUser(data);
      
      // Log successful login
      console.log('Login successful for:', username);
      console.log('User roles:', data.roles);
      
      // Don't navigate here - let the Login component handle redirection
      return data;
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      setLoading(true);
      const data = await authService.register(userData);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setCurrentUser(null);
    navigate('/login', { replace: true });
  };

  // Helper function to check if the user has admin role
  const isAdmin = () => {
    if (!currentUser || !currentUser.roles) {
      return false;
    }
    return currentUser.roles.includes('ROLE_ADMIN');
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 