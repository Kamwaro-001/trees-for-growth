import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import axios from "axios";

import authService from "../services/auth.service";
import { setAxiosAuthToken } from "../redux/utils/Utils";
import { toast } from "react-toastify";
import { getAccountUserAsync } from "./Account.Slice";

// const auth_token = JSON.parse(localStorage.getItem("token"));
const user = JSON.parse(localStorage.getItem("token"));

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

export const login = ({ formValue, redirectTo }) => async (dispatch) => {
  try {
    let email = formValue.email
    let password = formValue.password

    const response = await axios.post("/api/accounts/token/login/", { email, password })
    setAxiosAuthToken(response.data.auth_token)
    dispatch(setToken(response.data.auth_token))
    dispatch(getAccountUserAsync())
    dispatch(setCurrentUser(redirectTo))
  } catch (error) {
    const message = "wrong username or password"
    dispatch(setMessage(message));
  }
}

export const setCurrentUser = (redirectTo) => dispatch => {
  console.log('set user' + redirectTo);
  if (redirectTo !== '') {
    dispatch(window.location.replace(redirectTo))
  }
}

export const setToken = token => dispatch => {
  setAxiosAuthToken(token);
  localStorage.setItem('token', JSON.stringify(token));
}

export const unsetCurrentUser = () => {
  setAxiosAuthToken("");
  localStorage.clear();
};

export const logout = () => dispatch => {
  axios.post('/api/accounts/token/logout/')
    .then(response => {
      dispatch(unsetCurrentUser());
      toast.success("Logout Successful")
      dispatch(window.location.replace('/login'))
    })
    .catch((error) => {
      dispatch(unsetCurrentUser());
      console.log(error)
    })
}

const initialState = user
  ? { isLoggedIn: true, user, isAuthenticated: true }
  : { isLoggedIn: false, user: null, isAuthenticated: false };

const authSlice = createSlice({
  name: "auth",
  initialState,
  // user: auth_token ? { isLoggedIn: true, auth_token } : { isLoggedIn: false, user: null },
  // token: auth_token ? { isAuthenticated: true, auth_token } : { isAuthenticated: false, auth_token: null },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [register.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.persona = action.payload.persona;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
      state.isAuthenticated = false;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

const { reducer } = authSlice;
export const showUser = (state) => state.auth;
export default reducer;