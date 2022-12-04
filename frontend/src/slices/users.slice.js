import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { toastOnError } from "../redux/utils/Utils";

export const userSlice = createSlice({
  name: "userinfo",
  initialState: {
    data: []
  },
  reducers: {
    addUser: (state, action) => {
      state.data.push(action.payload);
    },
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

export const addUserAsync = (data) => async (dispatch) => {
  try {
    const response = await axios.post("api/users/", data);
    dispatch(addUser(response.data))
  } catch (error) {
    toastOnError(error);
  }
}

export const updateUserAsync = (id, data) => async (dispatch) => {
  try {
    const response = await axios.patch(`/api/users/${id}`, data)
    dispatch(updateUser(response.data))
  } catch (err) {
    toastOnError(err)
  }
}

export const { addUser, getUser, updateUser } = userSlice.actions;
export const showUser = (state) => state.userinfo.data
export default userSlice.reducer;