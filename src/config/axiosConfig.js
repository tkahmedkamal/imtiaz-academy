import axios from 'axios';

const token = localStorage.getItem('im_access_token');

const axiosConfig = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const axiosConfigWithoutToken = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export default axiosConfig;
