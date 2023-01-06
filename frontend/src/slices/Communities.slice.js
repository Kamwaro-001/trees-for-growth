import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toastAnError } from "../redux/utils/Utils";
import communitiesService from "../services/communities.service";

export const getCommunityAsync = createAsyncThunk('communities/getAllCommunities', async () => {
  const data = await communitiesService.communities()
  return data
})

export const getMyCommunities = createAsyncThunk('communities/getMyCommunities', async () => {
  const data = await communitiesService.myCommunities()
  return data
})

export const getMyMembership = createAsyncThunk('communities/getMyMembership', async () => {
  const data = await communitiesService.membership()
  return data
})

export const addCommunityAsync = (data) => async (dispatch) => {
  try {
    const response = await axios.post("/api/communities/", data);
    dispatch(addCommunity(response.data));
  } catch (err) {
    toastAnError('An error occurred, please check your input and try again!')
  }
};

export const patchCommunity = (id, data) => async (dispatch) => {
  try {
    const response = await axios.patch(`/api/communities/${id}/`, data);
    dispatch(updateCommunity(response.data))
  } catch (err) {
    toastAnError('An error occurred, please check your input and try again!')
  }
}

export const communitySlice = createSlice({
  name: "communities",
  initialState: {
    data: [],
    allcommunities: [],
    myCreated: [],
    membership: []
  },
  reducers: {
    addCommunity: (state, action) => {
      state.data.push(action.payload);
    },
    updateCommunity: (state, action) => {
      state.data.push(action.payload);
    }
  },
  extraReducers: builder => {
    builder.addCase(getCommunityAsync.fulfilled, (state, action) => {
      state.allcommunities = [action.payload]
    })
    builder.addCase(getCommunityAsync.rejected, (state) => {
      state.allcommunities = []
    })
    builder.addCase(getMyCommunities.fulfilled, (state, action) => {
      state.myCreated = [action.payload]
    })
    builder.addCase(getMyCommunities.rejected, (state) => {
      state.myCreated = []
    })
    builder.addCase(getMyMembership.fulfilled, (state, action) => {
      state.membership = [action.payload]
    })
    builder.addCase(getMyMembership.rejected, (state) => {
      state.membership = []
    })
  }
});

export const { addCommunity, getCommunity, updateCommunity, myCreated } = communitySlice.actions;
export const showCommunity = (state) => state.communities.allcommunities;
export const showMyCommunity = (state) => state.communities.myCreated;
export const showMembership = (state) => state.communities.membership;

export default communitySlice.reducer;