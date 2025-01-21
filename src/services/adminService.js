import axios from "axios";

/*
  Function Axios Instance -> Communication With API Backend
*/
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
  /* 
    Function Admin -> Create, Read, Update, Delete
  */
  adminLogin: async (credentials) => {
    try {
      const response = await axiosInstance.post("/admin/login", credentials);
      if (response.data.accessToken) {
        localStorage.setItem("adminAccessToken", response.data.accessToken);
      }
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || { msg: "An error occurred during admin login" }
      );
    }
  },

  getAdmins: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { msg: "Failed to Fetch Admin!" };
    }
  },

  getCurrentAdmin: async () => {
    try {
      const response = await axiosInstance.get(`${API_BASE_URL}/admin/me`);
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || { msg: "Failed to fetch current admin data!" }
      );
    }
  },

  adminLogout: async () => {
    try {
      await axiosInstance.delete("/admin/logout");
      localStorage.removeItem("adminAccessToken");
    } catch (error) {
      throw (
        error.response?.data || { msg: "An error occurred during admin logout" }
      );
    }
  },

  /* 
    Function User -> Create, Read, Update, Delete
  */
  getUsers: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { msg: "Failed to Fetch User!" };
    }
  },

  createUser: async (userData) => {
    const response = await axios.post(`${API_BASE_URL}/admin/users`, userData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}`,
      },
    });
    return response.data;
  },

  updateUser: async (id, userData) => {
    const response = await axios.put(
      `${API_BASE_URL}/admin/users/${id}`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}`,
        },
      }
    );
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/admin/users/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}`,
      },
    });
    return response.data;
  },

  /* 
    Function Product -> Create, Read, Update, Delete
  */
  getProducts: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/products`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { msg: "Failed to Fetch Product!" };
    }
  },

  createProduct: async (productData) => {
    const response = await axios.post(
      `${API_BASE_URL}/admin/products`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}`,
          "Content-Type": "multipart/form-data", // Set the content type for file uploads
        },
      }
    );
    return response.data;
  },

  updateProduct: async (id, productData) => {
    const response = await axios.put(
      `${API_BASE_URL}/admin/products/${id}`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  deleteProduct: async (id) => {
    const response = await axios.delete(
      `${API_BASE_URL}/admin/products/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}`,
        },
      }
    );
    return response.data;
  },

  /*  
    Function Order -> Create, Read, Update, Delete
  */
  getOrders: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { msg: "Failed to Fetch Order" };
    }
  },

  createOrder: async (orderData) => {
    const response = await axios.post(
      `${API_BASE_URL}/admin/orders`,
      orderData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}`,
        },
      }
    );
    return response.data;
  },

  updateOrder: async (id, orderData) => {
    const response = await axios.put(
      `${API_BASE_URL}/admin/orders/${id}`,
      orderData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}`,
        },
      }
    );
    return response.data;
  },

  updateOrderStatus: async (orderData) => {
    const response = await axios.put(
      `${API_BASE_URL}/admin/orders/status`,
      orderData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}`,
        },
      }
    );
    return response.data;
  },

  deleteOrder: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/admin/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminAccessToken")}`,
      },
    });
    return response.data;
  },
};

export default adminService;
