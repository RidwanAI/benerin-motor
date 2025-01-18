import axios from "axios";

// Backend URL
const API_BASE_URL = "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminAccessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const adminService = {
  // Function -> Admin CRUD
  getAdmins: async () => {
    const response = await axios.get(`${API_BASE_URL}/admin`);
    return response.data;
  },

  // Function -> User CRUD
  getUsers: async () => {
    const response = await axios.get(`${API_BASE_URL}/admin/users`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}` },
    });
    return response.data;
  },

  createUser: async (userData) => {
    const response = await axios.post(`${API_BASE_URL}/admin/users`, userData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}` },
    });
    return response.data;
  },

  updateUser: async (id, userData) => {
    const response = await axios.put(`${API_BASE_URL}/admin/users/${id}`, userData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}` },
    });
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/admin/users/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}` },
    });
    return response.data;
  },

  // Function -> Product CRUD
  getProducts: async () => {
    const response = await axios.get(`${API_BASE_URL}/admin/products`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}` },
    });
    return response.data;
  },

  createProduct: async (productData) => {
    const response = await axios.post(`${API_BASE_URL}/admin/products`, productData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}`,
        "Content-Type": "multipart/form-data", // Set the content type for file uploads
      },
    });
    return response.data;
  },
  

  updateProduct: async (id, productData) => {
    const response = await axios.put(`${API_BASE_URL}/admin/products/${id}`, productData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data; // Ensure it returns the updated product
  },  

  deleteProduct: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/admin/products/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}` },
    });
    return response.data;
  },

  // Function -> Order CRUD
  getOrders: async () => {
    const response = await axios.get(`${API_BASE_URL}/admin/orders`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}` },
    });
    return response.data;
  },

  createOrder: async (orderData) => {
    const response = await axios.post(`${API_BASE_URL}/admin/orders`, orderData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}` },
    });
    return response.data;
  },

  updateOrder: async (id, orderData) => {
    const response = await axios.put(`${API_BASE_URL}/admin/orders/${id}`, orderData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}` },
    });
    return response.data;
  },

  deleteOrder: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/admin/orders/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}` },
    });
    return response.data;
  },

  updateOrderStatus: async (orderData) => {
    const response = await axios.put(`${API_BASE_URL}/admin/orders/status`, orderData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}` },
    });
    return response.data;
  },
};

export default adminService;
