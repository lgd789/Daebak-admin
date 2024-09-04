import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCarousel = createAsyncThunk("carousel/fetchCarousel", async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/carousel`);

    console.log("carousel", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching coupons:", error);
    throw error;
  }
});

export const fetchUpdateCarousel = createAsyncThunk(
  "carousel/fetchUpdateCarousel",
  async (formData) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/carousel`, formData);

      return response.data;
    } catch (error) {
      console.error("Error fetching coupons:", error);
      throw error;
    }
  }
);

export const fetchDeleteCarousel = createAsyncThunk(
  "carousel/fetchDeleteCarousel",
  async (carouselId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/carousel/${carouselId}`
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching coupons:", error);
      throw error;
    }
  }
);

const categorySlice = createSlice({
  name: "carousel",
  initialState: {
    carouselItems: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarousel.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCarousel.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.carouselItems = action.payload;
      })
      .addCase(fetchCarousel.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchUpdateCarousel.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUpdateCarousel.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updateCarousel = action.payload;
        const index = state.carouselItems.findIndex(
          (carouselItem) => carouselItem.carouselId === updateCarousel.carouselId
        );

        if (index !== -1) {
          state.carouselItems[index] = updateCarousel;
        } else {
          state.carouselItems.push(updateCarousel);
        }
      })
      .addCase(fetchUpdateCarousel.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchDeleteCarousel.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDeleteCarousel.fulfilled, (state, action) => {
        state.status = "succeeded";
        const deletedCarouselId = action.payload;

        state.carouselItems = state.carouselItems.filter(
          (carouselItem) => carouselItem.carouselId !== deletedCarouselId
        );
      })
      .addCase(fetchDeleteCarousel.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;
