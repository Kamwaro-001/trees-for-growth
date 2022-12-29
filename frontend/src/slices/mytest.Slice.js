import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  users: [],
  error: ''
}

const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  const response = await axios.get('/api/accounts/users/me/');
  return response.data.map((user) => user.id);
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false
      state.users = action.payload
      state.error = ''
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false
      state.users = []
      state.error = action.error.message
    })
  }
})

const { reducer } = userSlice
export const showTestSlice = (state) => state.user
export default reducer

// module.exports = userSlice.reducer
// module.exports.fetchUsers = fetchUsers