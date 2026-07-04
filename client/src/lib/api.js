import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const auth = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  me: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
};

export const categories = {
  getAll: () => api.get('/categories'),
  getById: (id) => api.get(`/categories/${id}`),
  getBySlug: (slug) => api.get(`/categories/slug/${slug}`),
};

export const providers = {
  getAll: (params) => api.get('/providers', { params }),
  getById: (id) => api.get(`/providers/${id}`),
};

export const bookings = {
  create: (data) => api.post('/bookings', data),
  getAll: () => api.get('/bookings'),
  getById: (id) => api.get(`/bookings/${id}`),
  updateStatus: (id, status) => api.patch(`/bookings/${id}/status`, { status }),
  getSlots: (params) => api.get('/bookings/slots', { params }),
};

export const messages = {
  send: (data) => api.post('/messages', data),
  getConversations: () => api.get('/messages'),
  getConversation: (userId) => api.get(`/messages/conversation/${userId}`),
  markRead: (id) => api.put(`/messages/${id}/read`),
  markConversationRead: (userId) => api.put(`/messages/conversation/${userId}/read`),
};

export const recommendations = {
  get: () => api.get('/recommendations'),
  train: () => api.post('/recommendations/train'),
};

export default api;
