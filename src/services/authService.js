import axios from "axios";

const API_URL = "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for handling cookies
});

export const authService = {
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
      return response.data;
    } catch (error) {
      throw error.response?.data || { msg: "An error occurred during login" };
    }
  },

  logout: async () => {
    try {
      await axiosInstance.delete("/logout");
    } catch (error) {
      throw error.response?.data || { msg: "An error occurred during logout" };
    }
  },

  refreshToken: async () => {
    try {
      const response = await axiosInstance.get("/token");
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          msg: "An error occurred while refreshing token",
        }
      );
    }
  },
};
