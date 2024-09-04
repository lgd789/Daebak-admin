import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// fetchCoupons 액션 정의
export const fetchCoupons = createAsyncThunk("coupons/fetchCoupons", async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/coupon/all`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching coupons:", error);
    throw error; // 에러를 던져서 rejected 상태로 전환
  }
});

export const fetchUpdateCoupon = createAsyncThunk(
  "coupons/fetchUpdateCoupon",
  async ({ coupon }) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/coupon`, coupon);
      console.log("couponResponse");
      return response.data;
    } catch (error) {
      console.error("Error fetching coupons:", error);
      throw error; // 에러를 던져서 rejected 상태로 전환
    }
  }
);

export const fetchDeleteCoupon = createAsyncThunk(
  "coupons/fetchDeleteCoupon",
  async ({ couponId }) => {
    try {
      console.log("delete");
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/coupon/${couponId}`);
      console.log("couponResponse");
      return response.data;
    } catch (error) {
      console.error("Error fetching coupons:", error);
      throw error; // 에러를 던져서 rejected 상태로 전환
    }
  }
);

// coupontSlice 정의
const coupontSlice = createSlice({
  name: "coupons",
  initialState: {
    coupons: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoupons.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCoupons.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.coupons = action.payload;
      })
      .addCase(fetchCoupons.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchUpdateCoupon.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUpdateCoupon.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedCoupon = action.payload;
        const index = state.coupons.findIndex(
          (coupon) => coupon.couponId === updatedCoupon.couponId
        );

        if (index !== -1) {
          state.coupons[index] = updatedCoupon;
        } else {
          state.coupons.push(updatedCoupon);
        }
      })
      .addCase(fetchUpdateCoupon.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchDeleteCoupon.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDeleteCoupon.fulfilled, (state, action) => {
        state.status = "succeeded";
        const deleteCouponId = action.payload;

        state.coupons = state.coupons.filter((coupon) => coupon.couponId !== deleteCouponId);
      })
      .addCase(fetchDeleteCoupon.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { updateCoupon } = coupontSlice.actions;
export default coupontSlice.reducer;
