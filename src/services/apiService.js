const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

const apiService = {
  // Blog APIs
  getAllBlogs: async () => {
    return apiCall('/blogs');
  },

  getBlogById: async (id) => {
    return apiCall(`/blogs/${id}`);
  },

  createBlog: async (blogData) => {
    return apiCall('/blogs', {
      method: 'POST',
      body: JSON.stringify(blogData),
    });
  },

  updateBlog: async (id, blogData) => {
    return apiCall(`/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(blogData),
    });
  },

  deleteBlog: async (id) => {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: 'DELETE',
    });
    return response.ok;
  },

  // Contact Form API
  submitContactForm: async (formData) => {
    return apiCall('/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  },

  // Admin Authentication
  login: async (credentials) => {
    return apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },
};

export default apiService;