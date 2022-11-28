import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toastOnError } from "../redux/utils/Utils";

export const communitySlice = createSlice({
  name: "communities",
  initialState: {
    data: []
  },
  reducers: {
    addCommunity: (state, action) => {
      state.data.push(action.payload);
    },
    getCommunity: (state, action) => {
      state.data = [action.payload];
    },
    updateCommunity: (state, action) => {
      state.data.push(action.payload);
    }
  }
});

export const getCommunityAsync = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/communities/");
    dispatch(getCommunity(response.data));
  } catch (err) {
    toastOnError(err);
  }
};

export const addCommunityAsync = (data) => async (dispatch) => {
  try {
    const response = await axios.post("api/communities/", data);
    dispatch(addCommunity(response.data));
  } catch (err) {
    toastOnError(err);
  }
};

export const patchCommunity = (id, data) => async (dispatch) => {
  try {
    const response = await axios.patch(`api/communities/${id}/`, data);
    dispatch(updateCommunity(response.data))
  } catch (err) {
    toastOnError(err);
  }
}

export const { addCommunity, getCommunity, updateCommunity } = communitySlice.actions;
export const showCommunity = (state) => state.communities.data;
export default communitySlice.reducer;