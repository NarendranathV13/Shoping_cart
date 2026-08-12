import axios from 'axios';

// Create a custom axios instance with default configuration
const axiosInstance = axios.create({
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Perform any pre-request actions (e.g., attach tokens if stored)
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error('API Service Error:', error?.response || error.message);
        return Promise.reject(error);
    }
);

// API Service object wrapping all standard HTTP methods
export const api = {
    get: (url, config = {}) => axiosInstance.get(url, config),
    post: (url, data = {}, config = {}) => axiosInstance.post(url, data, config),
    put: (url, data = {}, config = {}) => axiosInstance.put(url, data, config),
    patch: (url, data = {}, config = {}) => axiosInstance.patch(url, data, config),
    delete: (url, config = {}) => axiosInstance.delete(url, config),
    axiosInstance,
};

export default api;
