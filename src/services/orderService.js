import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const getUser = async () => {
  const response = await axios.get(`${BASE_URL}/me`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
  });
  return response.data;
};

export const getOrdersByUserId = async (userId) => {
  const response = await axios.get(`${BASE_URL}/orders/user/${userId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
  });
  return response.data;
};

export const uploadPaymentProof = async (orderId, file) => {
  const formData = new FormData();
  formData.append("paymentProof", file);

  const response = await axios.post(`${BASE_URL}/orders/${orderId}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return response.data;
};
