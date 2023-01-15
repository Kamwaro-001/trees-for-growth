import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import authService from "../services/auth.service";
import { isEmpty, setAxiosAuthToken } from "../redux/utils/Utils";
import { toast } from "react-toastify";
import { Cookies } from "react-cookie";

const cookie = new Cookies()
const user = cookie.get('loggedIn')

export const register = createAsyncThunk(
  "/accounts/users/",
  async ({ username, email, password }, thunkAPI) => {
    try {
      const response = await authService.register(username, email, password);
      thunkAPI.dispatch(setMessage(response.data.message));
      toast.success("Account created successfully please login")
      return response.data;
    } catch (error) {
      const message = "user already exists"
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const login = createAsyncThunk('auth/login', async ( formValue, thunkAPI) => {
  try {
    let email = formValue.email
    let password = formValue.password

    const data = await authService.login(email, password)
    thunkAPI.dispatch(setMessage(""));
    return { user: data }

  } catch (error) {
    const message = "wrong username or password"
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
})

export const setToken = (token) => dispatch => {
  setAxiosAuthToken(token);
  dispatch(addToken(token))
}

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    await authService.logout();
  } catch (error) {

  }
});

const initialState = !isEmpty(user)
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addToken: (state, action) => {
      state.user = [action.payload]
    }
  },
  extraReducers: builder => {
    builder.addCase(register.fulfilled, (state) => {
      state.isLoggedIn = false;
    })
    builder.addCase(register.rejected, (state) => {
      state.isLoggedIn = false;
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    })
    builder.addCase(login.rejected, (state) => {
      state.isLoggedIn = false;
      state.user = null;
    })
    builder.addCase(logout.fulfilled, (state) => {
      state.isLoggedIn = false;
      state.user = null;
    })
  }
});

const { addToken } = authSlice.actions
const { reducer } = authSlice;
export const showUser = (state) => state.auth;
export default reducer;