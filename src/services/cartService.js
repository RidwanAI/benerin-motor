import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const cartService = {
  getCurrentUser: async () => {
    const response = await axios.get(`${BASE_URL}/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  },

  fetchCartItems: async (userId) => {
    const response = await axios.get(`${BASE_URL}/carts/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  },

  adjustQuantity: async (cartId, quantity) => {
    const response = await axios.put(
      `${BASE_URL}/carts/${cartId}`,
      { quantity },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data;
  },

  removeItem: async (cartId) => {
    await axios.delete(`${BASE_URL}/carts/${cartId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  },

  checkout: async (checkoutData) => {
    const response = await axios.post(`${BASE_URL}/checkout`, checkoutData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  },

  addToCart: async (payload) => {
    try {
      const response = await axios.post(`${BASE_URL}/carts`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error adding to cart:",
        error.response?.data || error.message
      );
      throw error;
    }
  },
};
