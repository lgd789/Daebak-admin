import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPromotionalVideo = createAsyncThunk(
  "promotionalVideo/fetchPromotionalVideo",
  async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/promotionalVideo`);

      console.log("video", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching coupons:", error);
      throw error;
    }
  }
);

export const fetchUpdatePromotionalVideo = createAsyncThunk(
  "promotionalVideo/fetchUpdatePromotionalVideo",
  async (formData) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/promotionalVideo`,
        formData
      );

      console.log("update video", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching coupons:", error);
      throw error;
    }
  }
);

// export const fetchDeleteCarousel = createAsyncThunk(
//   "carousel/fetchDeleteCarousel",
//   async (carouselId) => {
//     try {
//       const response = await axios.delete(
//         `${process.env.REACT_APP_API_URL}/carousel/${carouselId}`
//       );

//       return response.data;
//     } catch (error) {
//       console.error("Error fetching coupons:", error);
//       throw error;
//     }
//   }
// );

const categorySlice = createSlice({
  name: "promotionalVideo",
  initialState: {
    promotionalVideos: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPromotionalVideo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPromotionalVideo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.promotionalVideos = action.payload;
      })
      .addCase(fetchPromotionalVideo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchUpdatePromotionalVideo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUpdatePromotionalVideo.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatePromotionalVideo = action.payload;
        const index = state.promotionalVideos.findIndex(
          (promotionalVideo) => promotionalVideo.carouselId === updatePromotionalVideo.carouselId
        );

        if (index !== -1) {
          state.promotionalVideos[index] = updatePromotionalVideo;
        } else {
          state.promotionalVideos.push(updatePromotionalVideo);
        }
      })
      .addCase(fetchUpdatePromotionalVideo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    //   .addCase(fetchDeleteCarousel.pending, (state) => {
    //     state.status = "loading";
    //   })
    //   .addCase(fetchDeleteCarousel.fulfilled, (state, action) => {
    //     state.status = "succeeded";
    //     const deletedCarouselId = action.payload;

    //     state.carouselItems = state.carouselItems.filter(
    //       (carouselItem) => carouselItem.carouselId !== deletedCarouselId
    //     );
    //   })
    //   .addCase(fetchDeleteCarousel.rejected, (state, action) => {
    //     state.status = "failed";
    //     state.error = action.error.message;
    //   });
  },
});

export default categorySlice.reducer;
