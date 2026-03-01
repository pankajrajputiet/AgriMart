// client/src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
  logout: () => api.get('/auth/logout'),
  addAddress: (data) => api.post('/auth/address', data),
  getAddresses: () => api.get('/auth/addresses'),
};

// Product APIs
export const productAPI = {
  getProducts: (params) => api.get('/products', { params }),
  getProduct: (slug) => api.get(`/products/${slug}`),
  getFeatured: () => api.get('/products/featured'),
  searchProducts: (q) => api.get(`/products/search?q=${q}`),
  getByCategory: (category) => api.get(`/products/category/${category}`),
  addReview: (productId, data) => api.post(`/products/${productId}/reviews`, data),
  createProduct: (data) => api.post('/products', data),
  updateProduct: (id, data) => api.put(`/products/${id}`, data),
  deleteProduct: (id) => api.delete(`/products/${id}`),
};

// Order APIs
export const orderAPI = {
  createOrder: (data) => api.post('/orders', data),
  getMyOrders: () => api.get('/orders/my-orders'),
  getOrder: (id) => api.get(`/orders/${id}`),
  cancelOrder: (id) => api.put(`/orders/${id}/cancel`),
  updateOrderStatus: (id, status) => api.put(`/orders/${id}/status`, { status }),
};

// Wishlist APIs
export const addToWishlist = (productId) => api.post(`/users/wishlist/${productId}`);
export const removeFromWishlist = (productId) => api.delete(`/users/wishlist/${productId}`);

export default api;