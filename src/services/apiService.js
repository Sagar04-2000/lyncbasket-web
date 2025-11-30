const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Generic API helper
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const text = await response.text();

    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch (e) {
      data = text;
    }

    if (!response.ok) {
      throw new Error(data?.message || `HTTP error! Status: ${response.status}`);
    }

    return {
      status: response.status,
      data,
    };

  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

const apiService = {
  // Blog APIs
  getAllBlogs: async () => apiCall('/blogs'),

  getBlogById: async (id) => apiCall(`/blogs/${id}`),

  createBlog: async (blogData) =>
    apiCall('/blogs', {
      method: 'POST',
      body: JSON.stringify(blogData),
    }),

  updateBlog: async (id, blogData) =>
    apiCall(`/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(blogData),
    }),

  deleteBlog: async (id) => {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: 'DELETE',
    });
    return response.ok;
  },

  // Contact Form API (FIXED)
  submitContactForm: async (formData) => {
    return apiCall('/contact/submit', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  },

  // Admin Authentication
  login: async (credentials) =>
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
};

export default apiService;
