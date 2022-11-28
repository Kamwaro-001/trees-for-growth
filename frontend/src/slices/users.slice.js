import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { toastOnError } from "../redux/utils/Utils";

const initialState = {
  data: []
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.data = [action.payload]
    },
    updateUser: (state, action) => {
      state.data.push(action.payload);
    }
  }
})

export const getUsersAsync = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/users/");
    dispatch(getUser(response.data));
  } catch (err) {
    toastOnError(err);
  }
};

export const updateUserAsync = (id, data) => async(dispatch) => {
  try {
    const response = await axios.patch(`/api/users/${id}`, data)
    dispatch(updateUser(response.data))
  } catch (err) {
    toastOnError(err)
  }
}

export const { getUser, updateUser } = userSlice.actions;