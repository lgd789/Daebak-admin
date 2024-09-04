// src/api/paymentDetail/refreshStatus/index.js
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/payment-detail";

export const refreshStatus = async () => {
  try {
    const response = await axios.post(`${API_URL}/refresh-status`);
    console.log("Payment status refreshed:", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
