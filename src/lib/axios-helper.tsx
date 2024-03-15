import axios from 'axios';

/** Add NEXT_PUBLIC_MOCK_DEPLOYMENT_URL to your production deployment on vercel! */
const baseURL = process.env.NEXT_PUBLIC_MOCK_DEPLOYMENT_URL
  ? `https://${process.env.NEXT_PUBLIC_MOCK_DEPLOYMENT_URL}/api/mock`
  : process.env.NEXT_PUBLIC_VERCEL_URL
    ? `${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:8000/';

export const api = axios.create({
  baseURL,
  withCredentials: false,
});

api.defaults.withCredentials = false;

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  const adminToken = localStorage.getItem('adminToken');
  if (config.headers) {
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    config.headers['X-ASTEC-ADMSIGN'] = adminToken ? `${adminToken}` : '';
  }
  return config;
});

export default api;
