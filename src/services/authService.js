import axios from "axios";

const API_URL = "http://localhost:5000";

// Handling Cookies
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  // User
  register: async (userData) => {
    try {
      const response = await axiosInstance.post("/register", userData);
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || { msg: "An error occurred during registration" }
      );
    }
  },

  login: async (credentials) => {
    try {
      const response = await axiosInstance.post("/login", credentials);
      if (response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { msg: "An error occurred during login" };
    }
  },

  logout: async () => {
    try {
      await axiosInstance.delete("/logout");
      localStorage.removeItem("accessToken");
    } catch (error) {
      throw error.response?.data || { msg: "An error occurred during logout" };
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await axiosInstance.get("/me"); // Endpoint untuk mendapatkan data user saat ini
      return response.data;
    } catch (error) {
      throw error.response?.data || { msg: "Error fetching user data" };
    }
  },

  refreshToken: async () => {
    try {
      const response = await axiosInstance.get("/token");
      return response.data;
    } catch (error) {
      localStorage.removeItem("accessToken");
      throw (
        error.response?.data || {
          msg: "An error occurred while refreshing token",
        }
      );
    }
  },
};
