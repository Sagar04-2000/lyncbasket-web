import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage, initialBlogs } from '../utils/helpers';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState(null);

  // Initialize blogs from localStorage or use initial data
  useEffect(() => {
    const storedBlogs = storage.get('lynkbasket_blogs');
    const adminStatus = storage.get('lynkbasket_admin');
    
    if (storedBlogs && storedBlogs.length > 0) {
      setBlogs(storedBlogs);
    } else {
      setBlogs(initialBlogs);
      storage.set('lynkbasket_blogs', initialBlogs);
    }

    if (adminStatus === true) {
      setIsAdmin(true);
    }
  }, []);

  // Save blogs to localStorage whenever they change
  useEffect(() => {
    if (blogs.length > 0) {
      storage.set('lynkbasket_blogs', blogs);
    }
  }, [blogs]);

  const navigateToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
  };

  const clearNotification = () => {
    setNotification(null);
  };

  const login = (username, password) => {
    const adminUser = process.env.REACT_APP_ADMIN_USERNAME || 'admin';
    const adminPass = process.env.REACT_APP_ADMIN_PASSWORD || 'admin123';

    if (username === adminUser && password === adminPass) {
      setIsAdmin(true);
      storage.set('lynkbasket_admin', true);
      showNotification('Admin login successful!', 'success');
      return true;
    }
    showNotification('Invalid credentials!', 'error');
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    storage.remove('lynkbasket_admin');
    showNotification('Logged out successfully!', 'success');
  };

  const addBlog = (blog) => {
    const newBlog = {
      ...blog,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setBlogs([newBlog, ...blogs]);
    showNotification('Blog created successfully!', 'success');
  };

  const updateBlog = (id, updatedBlog) => {
    setBlogs(
      blogs.map((blog) =>
        blog.id === id
          ? { ...blog, ...updatedBlog, updatedAt: new Date().toISOString() }
          : blog
      )
    );
    showNotification('Blog updated successfully!', 'success');
  };

  const deleteBlog = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
    showNotification('Blog deleted successfully!', 'success');
  };

  const value = {
    currentPage,
    navigateToPage,
    isAdmin,
    login,
    logout,
    blogs,
    addBlog,
    updateBlog,
    deleteBlog,
    notification,
    showNotification,
    clearNotification,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};