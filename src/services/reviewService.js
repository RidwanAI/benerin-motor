// reviewService.js
import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const submitReview = async (reviewData) => {
  try {
    const response = await axios.post(`${BASE_URL}/reviews`, reviewData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error submitting review:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getProductRating = async (productId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/reviews/product/${productId}/rating`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting product rating:", error);
    throw error;
  }
};
