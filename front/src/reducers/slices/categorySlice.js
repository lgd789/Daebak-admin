import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategories = createAsyncThunk("categories/fetchCategories", async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/category`);
    console.log("category", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching coupons:", error);
    throw error; // 에러를 던져서 rejected 상태로 전환
  }
});
export const fetchUpdateCategories = createAsyncThunk(
  "categories/fetchUpdateCategories",
  async (formData) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/category`, formData);
      console.log("updateCategory", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error; // 에러를 던져서 rejected 상태로 전환
    }
  }
);

export const fetchDeleteCategory = createAsyncThunk(
  "categories/fetchDeleteCategory",
  async (categoryId) => {
    try {
      console.log(categoryId);
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/category/${categoryId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error; // 에러를 던져서 rejected 상태로 전환
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchUpdateCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUpdateCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedCategory = action.payload;
        const index = state.categories.findIndex((category) => category.id === updatedCategory.id);

        if (index !== -1) {
          state.categories[index] = updatedCategory;
        } else {
          state.categories.push(updatedCategory);
        }
      })
      .addCase(fetchUpdateCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchDeleteCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDeleteCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        const deletedCategoryId = action.payload;

        state.categories = state.categories.filter((category) => category.id !== deletedCategoryId);
      })
      .addCase(fetchDeleteCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;
