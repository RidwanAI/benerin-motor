import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const productService = {
  // Fetch all products by category
  fetchProductsByCategory: async (category) => {
    const response = await axios.get(`${BASE_URL}/products/${category}`);
    return response.data;
  },

  // Fetch product details by ID
  fetchProductById: async (id) => {
    const response = await axios.get(`${BASE_URL}/products/${id}`);
    return response.data;
  },

  // Add a product to the cart
  addToCart: async (productId, userId, quantity) => {
    const response = await axios.post(
      `${BASE_URL}/carts`,
      { productId, userId, quantity },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data;
  },

  // Get current authenticated user
  getCurrentUser: async () => {
    const response = await axios.get(`${BASE_URL}/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  },
};
