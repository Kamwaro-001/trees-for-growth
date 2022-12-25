import { createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { toast } from "react-toastify";
import { toastOnError } from "../redux/utils/Utils";

// get user info, edit user info, 
const user = JSON.parse(localStorage.getItem("user"));

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    data: [],
    userinfo: user ? { user } : null
  },
  reducers: {
    getAccount: (state, action) => {
      state.data = [action.payload];
    },
    editAccount: (state, action) => {
      state.data.push(action.payload);
    }
  }
})

export const getUser = (data) => dispatch => {
  try {
    dispatch(getAccount(data))
    localStorage.setItem('user', JSON.stringify(data))
  } catch (error) {
    toast.warn()
    console.log(error);
  }
}

export const editAccountAsync = (data) => async (dispatch) => {
  try {
    const response = await axios.patch("api/accounts/users/me/", data);
    dispatch(editAccount(response.data))
  } catch (err) {
    console.log(err)
  }
}

export const getAccountUserAsync = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/accounts/users/me/");
    dispatch(getUser(response.data))
    localStorage.setItem('user', JSON.stringify(response.data))
  } catch (err) {
    toastOnError(err)
  }
}

export const { getAccount, editAccount } = accountSlice.actions
export const showAccount = (state) => state.account.userinfo.user;
export default accountSlice.reducer;