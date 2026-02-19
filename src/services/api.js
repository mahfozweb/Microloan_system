import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://loan-backend-steel.vercel.app';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            // Remove console logs in production if needed, but helpful for debugging now
            if (import.meta.env.DEV) {
                console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url} - Token attached`);
            }
        } else {
            if (import.meta.env.DEV) {
                console.warn(`[API Request] ${config.method?.toUpperCase()} ${config.url} - NO TOKEN FOUND in localStorage`);
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            // Do NOT do hard redirect here — let the calling code handle it
            // window.location.href = '/login' would break the auth sync flow
            console.warn('API 401 Unauthorized');
        }
        return Promise.reject(error);
    }
);

export default api;
