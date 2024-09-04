import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// fetchPaymentDetails 액션 정의
export const fetchPaymentDetails = createAsyncThunk(
  "paymentDetails/fetchPaymentDetails",
  async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/payment-detail/all`);
      console.log("paymentDetailResponse", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching paymentDetails:", error);
      throw error; // 에러를 던져서 rejected 상태로 전환
    }
  }
);

// paymentDetailSlice 정의
const paymentDetailSlice = createSlice({
  name: "paymentDetails",
  initialState: {
    paymentDetails: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaymentDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPaymentDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.paymentDetails = action.payload;
      })
      .addCase(fetchPaymentDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { updatePaymentDetail } = paymentDetailSlice.actions;
export default paymentDetailSlice.reducer;
