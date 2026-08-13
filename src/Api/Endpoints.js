import api from '../ApiService';

export const fetchProducts = () => api.get('https://64db5089593f57e435b0c522.mockapi.io/products');
export const fetchLanguages = () => api.get('https://65002c0e18c34dee0cd46da3.mockapi.io/Languages');
