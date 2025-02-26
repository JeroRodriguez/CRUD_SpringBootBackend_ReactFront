import axios from 'axios';

// API base URL - ajusta esto según tu configuración de backend
const API_URL = 'http://localhost:8080';

// Crear instancia de axios con configuración base
const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Servicio para manejar las operaciones CRUD de productos
const productService = {
    // Obtener todos los productos
    getAllProducts: async () => {
        try {
            const response = await apiClient.get('/');
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },

    // Obtener un producto por su ID
    getProductById: async (id) => {
        try {
            const response = await apiClient.get(`/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching product with id ${id}:`, error);
            throw error;
        }
    },

    // Crear un nuevo producto
    createProduct: async (productData) => {
        try {
            const response = await apiClient.post('/', productData);
            return response.data;
        } catch (error) {
            console.error('Error creating product:', error);
            throw error;
        }
    },

    // Actualizar un producto existente
    updateProduct: async (id, productData) => {
        try {
            const response = await apiClient.put(`/${id}`, productData);
            return response.data;
        } catch (error) {
            console.error(`Error updating product with id ${id}:`, error);
            throw error;
        }
    },

    // Eliminar un producto
    deleteProduct: async (id) => {
        try {
            const response = await apiClient.delete(`/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting product with id ${id}:`, error);
            throw error;
        }
    },
};

export default productService;