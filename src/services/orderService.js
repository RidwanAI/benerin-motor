import axios from "axios";

const API_URL = "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Penting untuk menangani cookie jika diperlukan
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const orderService = {
  // Create a new order (manual by admin)
  createOrder: async (orderData) => {
    try {
      const response = await axiosInstance.post("/orders", orderData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { msg: "Error creating order" };
    }
  },

  // Get all orders (admin view)
  getAllOrders: async () => {
    try {
      const response = await axiosInstance.get("/orders");
      return response.data;
    } catch (error) {
      throw error.response?.data || { msg: "Error fetching all orders" };
    }
  },

  // Get an order by ID
  getOrderById: async (orderId) => {
    try {
      const response = await axiosInstance.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { msg: "Error fetching order by ID" };
    }
  },

  // Update an order
  updateOrder: async (orderId, updatedData) => {
    try {
      const response = await axiosInstance.put(`/orders/${orderId}`, updatedData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { msg: "Error updating order" };
    }
  },

  // Delete an order
  deleteOrder: async (orderId) => {
    try {
      const response = await axiosInstance.delete(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { msg: "Error deleting order" };
    }
  },

  // Get orders by user ID
  getOrdersByUserId: async (userId) => {
    try {
      const response = await axiosInstance.get(`/orders/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { msg: "Error fetching orders by user ID" };
    }
  },
};
