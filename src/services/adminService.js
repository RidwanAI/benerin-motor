import axios from "axios";

// Backend URL
const API_BASE_URL = "http://localhost:5000";

const adminService = {
  // Function -> Admin Authentication
  login: async (email, password) => {
    const response = await axios.post(`${API_BASE_URL}/admin/login`, { email, password });
    return response.data;
  },

  logout: async () => {
    const response = await axios.delete(`${API_BASE_URL}/admin/logout`);
    return response.data;
  },

  // Function -> Admin CRUD
  getAdmins: async () => {
    const response = await axios.get(`${API_BASE_URL}/admin`);
    return response.data;
  },

  // Function -> User CRUD
  getUsers: async () => {
    const response = await axios.get(`${API_BASE_URL}/admin/users`);
    return response.data;
  },

  createUser: async (userData) => {
    const response = await axios.post(`${API_BASE_URL}/admin/users`, userData);
    return response.data;
  },

  updateUser: async (id, userData) => {
    const response = await axios.put(`${API_BASE_URL}/admin/users/${id}`, userData);
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/admin/users/${id}`);
    return response.data;
  },

  // Function -> Product CRUD
  getProducts: async () => {
    const response = await axios.get(`${API_BASE_URL}/admin/products`);
    return response.data;
  },

  createProduct: async (productData) => {
    const response = await axios.post(`${API_BASE_URL}/admin/products`, productData);
    return response.data;
  },

  updateProduct: async (id, productData) => {
    const response = await axios.put(`${API_BASE_URL}/admin/products/${id}`, productData);
    return response.data;
  },

  deleteProduct: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/admin/products/${id}`);
    return response.data;
  },

  // Function -> Order CRUD
  getOrders: async () => {
    const response = await axios.get(`${API_BASE_URL}/admin/orders`);
    return response.data;
  },

  createOrder: async (orderData) => {
    const response = await axios.post(`${API_BASE_URL}/admin/orders`, orderData);
    return response.data;
  },

  updateOrder: async (id, orderData) => {
    const response = await axios.put(`${API_BASE_URL}/admin/orders/${id}`, orderData);
    return response.data;
  },

  deleteOrder: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/admin/orders/${id}`);
    return response.data;
  },

  updateOrderStatus: async (orderData) => {
    const response = await axios.put(`${API_BASE_URL}/admin/orders/status`, orderData);
    return response.data;
  },
};

export default adminService;
