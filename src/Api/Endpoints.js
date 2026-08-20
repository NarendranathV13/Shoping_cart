import api from '../ApiService';
import { enhanceProductWithNewImage } from '../Assets/productImages';

export const fetchProducts = () => 
    api.get('https://64db5089593f57e435b0c522.mockapi.io/products').then(response => {
        if (Array.isArray(response.data)) {
            response.data = response.data.map(enhanceProductWithNewImage);
        }
        return response;
    });

export const fetchProductById = (id) => 
    api.get(`https://64db5089593f57e435b0c522.mockapi.io/products/${id}`).then(response => {
        if (response.data) {
            response.data = enhanceProductWithNewImage(response.data);
        }
        return response;
    });

export const fetchLanguages = () => api.get('https://65002c0e18c34dee0cd46da3.mockapi.io/Languages');

