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

  adjustQuantity: async (cartId, newQuantity, oldQuantity) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/carts/${cartId}`,
        { quantity: newQuantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      const quantityDiff = Math.abs(newQuantity - oldQuantity);
      const isIncreasing = newQuantity > oldQuantity;

      await axios.put(
        `${BASE_URL}/products/${response.data.productId}/stock`,
        {
          quantity: quantityDiff,
          increaseSold: false,
          isRestore: !isIncreasing,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error adjusting quantity:", error);
      throw error;
    }
  },

  removeItem: async (cartId, quantity, productId) => {
    try {
      await axios.delete(`${BASE_URL}/carts/${cartId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      await axios.put(
        `${BASE_URL}/products/${productId}/stock`,
        {
          quantity: quantity,
          increaseSold: false,
          isRestore: true,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
    } catch (error) {
      console.error("Error removing item:", error);
      throw error;
    }
  },

  checkout: async (checkoutData) => {
    try {
      // Create orders without updating product stock
      const response = await axios.post(`${BASE_URL}/checkout`, checkoutData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      // Only update sold count, without modifying stock
      for (const cartItemId of checkoutData.selectedCartItemIds) {
        const cartItem = checkoutData.cartItems.find(
          (item) => item.id === cartItemId
        );
        if (cartItem) {
          await axios.put(
            `${BASE_URL}/products/${cartItem.productId}/stock`,
            {
              quantity: cartItem.quantity,
              increaseSold: true,
              updateStockOnCheckout: false, // New flag to prevent stock update
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          );
        }
      }

      return response.data;
    } catch (error) {
      console.error("Error during checkout:", error);
      throw error;
    }
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
      console.error("Error adding to cart:", error);
      throw error;
    }
  },
};
