import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const productService = {
  // Fetch all products
  fetchAllProducts: async () => {
    try {
      const newProducts = await axios.get(`${BASE_URL}/products/new`);
      const secondProducts = await axios.get(`${BASE_URL}/products/second`);
      const recProducts = await axios.get(`${BASE_URL}/products/rec`);
      return [...newProducts.data, ...secondProducts.data, ...recProducts.data];
    } catch (error) {
      console.error("Error fetching all products:", error);
      throw error;
    }
  },

  // Fetch products by category
  fetchProductsByCategory: async (category) => {
    switch (category) {
      case "all":
        return await productService.fetchAllProducts();
      case "rec":
        const recProducts = await axios.get(`${BASE_URL}/products/rec`);
        return recProducts.data;
      case "new":
        const newProducts = await axios.get(`${BASE_URL}/products/new`);
        return newProducts.data;
      case "second":
        const secondProducts = await axios.get(`${BASE_URL}/products/second`);
        return secondProducts.data;
      default:
        throw new Error("Invalid category");
    }
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
