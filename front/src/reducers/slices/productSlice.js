import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// fetchProducts 액션 정의
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/product/getProducts`);
    console.log("productResponse", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // 에러를 던져서 rejected 상태로 전환
  }
});

export const fetchUpdateProduct = createAsyncThunk(
  "products/fetchUpdateProduct",
  async (product) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/product`, product);
      console.log("productResponse");
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error; // 에러를 던져서 rejected 상태로 전환
    }
  }
);

export const fetchAddProduct = createAsyncThunk("product/fetchAddProduct", async (formData) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/product`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
});

export const fetchUpdateProductImage = createAsyncThunk(
  "product/fetchUpdateProductImage",
  async (formData) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/product/image`, formData);
      return response.data;
    } catch (error) {
      console.error("Error adding product:", error);
      throw error;
    }
  }
);

export const fetchDeleteProduct = createAsyncThunk(
  "product/fetchDeleteProduct",
  async (productId) => {
    try {
      console.log(productId);
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/product/${productId}`);
      return response.data;
    } catch (error) {
      console.error("Error adding product:", error);
      throw error;
    }
  }
);

export const fetchUpdateOption = createAsyncThunk(
  "product/fetchUpdateOption",
  async ({ productId, options }) => {
    try {
      console.log(productId);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/product/option/${productId}`,
        options
      );
      return response.data;
    } catch (error) {
      console.error("Error adding product:", error);
      throw error;
    }
  }
);

// productSlice 정의
const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchUpdateProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUpdateProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = state.products.map((product) =>
          product.productId === action.payload.productId ? action.payload : product
        );
      })
      .addCase(fetchUpdateProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchAddProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = [...state.products, action.payload];
      })
      .addCase(fetchAddProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchUpdateProductImage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUpdateProductImage.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updateProduct = action.payload;
        const index = state.products.findIndex(
          (product) => product.productId === updateProduct.productId
        );

        if (index !== -1) {
          state.products[index] = updateProduct;
        } else {
          state.products.push(updateProduct);
        }
      })
      .addCase(fetchUpdateProductImage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchDeleteProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDeleteProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        const deleteProductId = action.payload;
        state.products = state.products.filter((product) => product.productId !== deleteProductId);
      })
      .addCase(fetchDeleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchUpdateOption.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUpdateOption.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updateProduct = action.payload;
        const index = state.products.findIndex(
          (product) => product.productId === updateProduct.productId
        );

        if (index !== -1) {
          state.products[index] = updateProduct;
        } else {
          state.products.push(updateProduct);
        }
      })
      .addCase(fetchUpdateOption.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { updateProduct } = productSlice.actions;
export default productSlice.reducer;
