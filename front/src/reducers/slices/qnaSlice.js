import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// fetchQnas 액션 정의
export const fetchQnas = createAsyncThunk("qnas/fetchQnas", async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/qna/all`);
    console.log("qnaResponse", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching qnas:", error);
    throw error; // 에러를 던져서 rejected 상태로 전환
  }
});

export const fetchAddAnswer = createAsyncThunk(
  "reviews/fetchAddAnswer",
  async ({ questionId, answer }) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/qna/${questionId}`,
        answer
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchDeleteAnswer = createAsyncThunk(
  "reviews/fetchDeleteResponse",
  async ({ questionId, answerId }) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/qna/${questionId}/answer/${answerId}`
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// qnatSlice 정의
const qnatSlice = createSlice({
  name: "qnas",
  initialState: {
    qnas: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQnas.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQnas.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.qnas = action.payload;
      })
      .addCase(fetchQnas.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchAddAnswer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddAnswer.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updateQna = action.payload;
        const index = state.qnas.findIndex((qna) => qna.questionId === updateQna.questionId);

        if (index !== -1) {
          state.qnas[index] = updateQna;
        } else {
          state.qnas.push(updateQna);
        }
      })
      .addCase(fetchAddAnswer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchDeleteAnswer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDeleteAnswer.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updateQna = action.payload;
        const index = state.qnas.findIndex((qna) => qna.questionId === updateQna.questionId);

        if (index !== -1) {
          state.qnas[index] = updateQna;
        } else {
          state.qnas.push(updateQna);
        }
      })
      .addCase(fetchDeleteAnswer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { updateQna } = qnatSlice.actions;
export default qnatSlice.reducer;
