import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// fetchReviews 액션 정의
export const fetchReviews = createAsyncThunk("reviews/fetchReviews", async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/review/all`);
    console.log("reviewResponse", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error; // 에러를 던져서 rejected 상태로 전환
  }
});

export const fetchSaveReviews = createAsyncThunk(
  "reviews/fetchSaveReviews",
  async ({ reviewId, reviewResponse }) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/review/${reviewId}`,
        reviewResponse
      );
      console.log("reviewResponse", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching reviews:", error);
      throw error;
    }
  }
);

export const fetchDeleteResponse = createAsyncThunk(
  "reviews/fetchDeleteResponse",
  async ({ reviewId, responseId }) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/review/${reviewId}/response/${responseId}`
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching reviews:", error);
      throw error;
    }
  }
);

export const fetchUpdateBestReview = createAsyncThunk(
  "reviews/fetchUpdateBestReview",
  async ({ reviewId }) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/review/best/${reviewId}`);
      console.log("reviewResponse", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching reviews:", error);
      throw error;
    }
  }
);

// reviewtSlice 정의
const reviewtSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSaveReviews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSaveReviews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reviews = state.reviews.map((review) =>
          review.reviewId === action.payload.reviewId ? action.payload : review
        );
        console.log(state.reviews);
      })
      .addCase(fetchSaveReviews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchUpdateBestReview.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUpdateBestReview.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reviews = state.reviews.map((review) =>
          review.reviewId === action.payload.reviewId ? action.payload : review
        );
        console.log(state.reviews);
      })
      .addCase(fetchUpdateBestReview.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchDeleteResponse.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDeleteResponse.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedReview = action.payload;
        const index = state.reviews.findIndex(
          (review) => review.reviewId === updatedReview.reviewId
        );

        if (index !== -1) {
          state.reviews[index] = updatedReview;
        } else {
          state.reviews.push(updatedReview);
        }
      })
      .addCase(fetchDeleteResponse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { updateReview } = reviewtSlice.actions;
export default reviewtSlice.reducer;
