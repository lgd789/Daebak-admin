import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// fetchProducts 액션 정의
export const fetchDealProducts = createAsyncThunk("dealProducts/fetchDealProducts", async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/product/deal`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // 에러를 던져서 rejected 상태로 전환
  }
});

export const fetchUpdateDealProducts = createAsyncThunk(
  "dealProducts/fetchUpdateDealProducts",
  async (dealProduct) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/product/deal`,
        dealProduct
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error; // 에러를 던져서 rejected 상태로 전환
    }
  }
);

export const fetchSaveDealProducts = createAsyncThunk(
  "dealProducts/fetchSaveDealProducts",
  async (dealProduct) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/product/deal`,
        dealProduct
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error; // 에러를 던져서 rejected 상태로 전환
    }
  }
);

export const fetchDeleteDealProduct = createAsyncThunk(
  "dealProducts/fetchDeleteDealProduct",
  async (dealProduct) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/product/deal/delete`,
        dealProduct
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error; // 에러를 던져서 rejected 상태로 전환
    }
  }
);

const dealProductSlice = createSlice({
  name: "dealProducts",
  initialState: {
    dealProducts: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDealProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDealProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dealProducts = action.payload;
      })
      .addCase(fetchDealProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchUpdateDealProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUpdateDealProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dealProducts = state.dealProducts.map((dealProduct) =>
          dealProduct.dealId === action.payload.dealId ? action.payload : dealProduct
        );
      })
      .addCase(fetchUpdateDealProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSaveDealProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSaveDealProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updateDealProduct = action.payload;
        const index = state.dealProducts.findIndex(
          (dealProduct) => dealProduct.dealId === updateDealProduct.dealId
        );

        if (index !== -1) {
          state.dealProducts[index] = updateDealProduct;
        } else {
          state.dealProducts.push(updateDealProduct);
        }
      })
      .addCase(fetchSaveDealProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchDeleteDealProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDeleteDealProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dealProducts = state.dealProducts.filter(
          (deal) => deal.dealId !== action.payload.dealId
        );
      })
      .addCase(fetchDeleteDealProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default dealProductSlice.reducer;
