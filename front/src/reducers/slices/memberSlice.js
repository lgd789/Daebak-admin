import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import authorsDatas from "layouts/tables/authorsTable/data/authorsData";

export const fetchMembers = createAsyncThunk("members/fetchMembers", async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/member/getMembers`);

  return response.data;
});

export const saveMember = createAsyncThunk("members/saveMember", async (memberData) => {
  const response = await axios.put(`${process.env.REACT_APP_API_URL}/member/update`, memberData);
  return response.data;
});

export const saveMemberCoupon = createAsyncThunk("members/saveMemberCoupon", async (memberData) => {
  const response = await axios.put(
    `${process.env.REACT_APP_API_URL}/member/updateCoupon`,
    memberData
  );
  return response.data;
});

export const addMemberCoupon = createAsyncThunk(
  "members/addMemberCoupon",
  async ({ members, coupon }) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/member/addCoupon`, {
      members,
      coupon,
    });
    return response.data;
  }
);

export const addMemberPoints = createAsyncThunk(
  "members/addMemberPoints",
  async ({ members, points }) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/points/points`, {
      members,
      points,
    });
    return response.data;
  }
);

const memberSlice = createSlice({
  name: "members",
  initialState: {
    members: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMembers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.members = [...action.payload];
        console.log(state.members);
      })
      .addCase(fetchMembers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(saveMember.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveMember.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.members = state.members.map((member) =>
          member.memberId === action.payload.memberId ? action.payload : member
        );
      })
      .addCase(saveMember.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(saveMemberCoupon.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveMemberCoupon.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.members = state.members.map((member) =>
          member.memberId === action.payload.memberId ? action.payload : member
        );
      })
      .addCase(saveMemberCoupon.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addMemberCoupon.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addMemberCoupon.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedMemberIds = action.payload.map((updatedMember) => updatedMember.memberId);
        state.members = state.members.map((member) =>
          updatedMemberIds.includes(member.memberId)
            ? action.payload.find((updatedMember) => updatedMember.memberId === member.memberId)
            : member
        );
      })
      .addCase(addMemberCoupon.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addMemberPoints.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addMemberPoints.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedMemberIds = action.payload.map((updatedMember) => updatedMember.memberId);
        state.members = state.members.map((member) =>
          updatedMemberIds.includes(member.memberId)
            ? action.payload.find((updatedMember) => updatedMember.memberId === member.memberId)
            : member
        );
      })
      .addCase(addMemberPoints.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default memberSlice.reducer;
