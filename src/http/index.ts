import axios from 'axios';
import AuthService from '../services/AuthServoce';

const api = axios.create({
  withCredentials: true,
  baseURL:
    process.env.NODE_ENV === 'production'
      ? '/api'
      : process.env?.REACT_APP_API_URL || 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      error.config &&
      !error.config._isTry &&
      error.config.url !== '/refresh'
    ) {
      originalRequest._isTry = true;
      try {
        const response = await AuthService.refresh();
        localStorage.setItem('token', response.data.accessToken);
        api.request(originalRequest);
      } catch (error) {
        console.log(error);
      }
    }
    throw error;
  },
);

export default api;
