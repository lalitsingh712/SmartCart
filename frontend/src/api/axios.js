import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — attach JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('smartcart_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle 401/403
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('smartcart_token');
      localStorage.removeItem('smartcart_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

// =====================
// Auth APIs
// =====================
export const authAPI = {
  register: (data) => axiosInstance.post('/auth/register', data),
  login: (data) => axiosInstance.post('/auth/login', data),
};

// =====================
// Product APIs
// =====================
export const productAPI = {
  getAll: (page = 0, size = 12, sortBy = 'id', sortDir = 'asc') =>
    axiosInstance.get(`/products?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`),
  getById: (id) => axiosInstance.get(`/products/${id}`),
  getByCategory: (category, page = 0, size = 12) =>
    axiosInstance.get(`/products/category/${category}?page=${page}&size=${size}`),
  search: (keyword, page = 0, size = 12) =>
    axiosInstance.get(`/products/search?keyword=${keyword}&page=${page}&size=${size}`),
  getCategories: () => axiosInstance.get('/products/categories'),
  create: (data) => axiosInstance.post('/products', data),
  update: (id, data) => axiosInstance.put(`/products/${id}`, data),
  delete: (id) => axiosInstance.delete(`/products/${id}`),
};

// =====================
// Cart APIs
// =====================
export const cartAPI = {
  getCart: () => axiosInstance.get('/cart'),
  addItem: (data) => axiosInstance.post('/cart/items', data),
  updateItem: (itemId, data) => axiosInstance.put(`/cart/items/${itemId}`, data),
  removeItem: (itemId) => axiosInstance.delete(`/cart/items/${itemId}`),
  clearCart: () => axiosInstance.delete('/cart/clear'),
};

// =====================
// Order APIs
// =====================
export const orderAPI = {
  placeOrder: (data) => axiosInstance.post('/orders', data),
  getMyOrders: (page = 0, size = 10) =>
    axiosInstance.get(`/orders/my-orders?page=${page}&size=${size}`),
  getOrderById: (id) => axiosInstance.get(`/orders/${id}`),
  getAllOrders: (page = 0, size = 10) =>
    axiosInstance.get(`/orders?page=${page}&size=${size}`),
  updateOrderStatus: (id, status) =>
    axiosInstance.patch(`/orders/${id}/status?status=${status}`),
};
