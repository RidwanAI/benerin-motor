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

  checkout: async (userId, selectedCartItemIds, shippingDetails) => {
    await axios.post(
      `${BASE_URL}/checkout`,
      {
        userId,
        selectedCartItemIds,
        ...shippingDetails,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
  },
};
