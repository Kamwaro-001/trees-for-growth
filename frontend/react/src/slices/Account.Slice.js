import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Cookies } from "react-cookie";
import { toast } from "react-toastify";
import { isEmpty } from "../redux/utils/Utils";
import accountService from "../services/account.service";

const cookie = new Cookies()
const user = cookie.get('user')

const initialState = !isEmpty(user) ? { isSet: true, user } : { isSet: false, user: [] }

export const getAccountUserAsync = createAsyncThunk('user/getuser', async () => {
  const data = await accountService.getCurrentUserInfo()
  return data
})

export const editAccountAsync = createAsyncThunk('user/edituser', async (data, thunkAPI) => {
  const response = await accountService.editCurrentUser(data)
  thunkAPI.dispatch(toast.success('Account Changes Successful! Use new details for your next login!'))
  return response.data
})

const accountSlice = createSlice({
  name: 'account',
  initialState,
  extraReducers: builder => {
    builder.addCase(getAccountUserAsync.fulfilled, (state, action) => {
      state.isSet = true
      state.user = action.payload
    })
    builder.addCase(getAccountUserAsync.rejected, (state) => {
      state.isSet = false
      state.user = []
    })
  }
})

const { reducer } = accountSlice;
export const showAccount = (state) => state.account.user;
export default reducer;