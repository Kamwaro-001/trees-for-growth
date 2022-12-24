import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import axios from "axios";

import authService from "../services/auth.service";
import { setAxiosAuthToken, toastOnError } from "../redux/utils/Utils";
import { toast } from "react-toastify";

const user = JSON.parse(localStorage.getItem("person"));
const auth_token = JSON.parse(localStorage.getItem("token"));

export const register = createAsyncThunk(
  "/accounts/users/",
  async ({ username, email, password }, thunkAPI) => {
    try {
      const response = await authService.register(username, email, password);
      thunkAPI.dispatch(setMessage(response.data.message));
      toast.success("Account created successfully please login")
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

// export const login0 = createAsyncThunk("auth/login", async ({ formValue, redirectTo }, thunkAPI) => {
//   try {
//     let email = formValue.email
//     let password = formValue.password

//     const response = await axios.post("/api/accounts/token/login/", { email, password })

//     thunkAPI.dispatch(setToken(response.data.auth_token))
//     // thunkAPI.dispatch(getCurrentUser(redirectTo))
//     return { user: response }

//   } catch (error) {
//     const message =
//       (error.response &&
//         error.response.data &&
//         error.response.data.message) ||
//       error.message ||
//       error.toString();
//     thunkAPI.dispatch(setMessage(message));
//     return thunkAPI.rejectWithValue();
//   }
// });

export const login = ({ formValue, redirectTo }) => async (dispatch) => {
  try {
    let email = formValue.email
    let password = formValue.password

    const response = await axios.post("/api/accounts/token/login/", { email, password })
    setAxiosAuthToken(response.data.auth_token)
    dispatch(setToken(response.data.auth_token))
    dispatch(getCurrentUser(redirectTo))
  } catch (err) {
    console.log(err)
  }
}

export const getCurrentUser = (redirectTo) => async (dispatch) => {
  try {
    const response = await axios.get('api/accounts/users/me/')
    const me = {
      username: response.data.username,
      email: response.data.email
    };
    dispatch(setCurrentUser(me, redirectTo))
  } catch (error) {
    console.log(error);
  }
}

export const setCurrentUser = (userinfo, redirectTo) => dispatch => {
  localStorage.setItem('person', JSON.stringify(userinfo))
  dispatch(setPerson(userinfo))
  console.log('set user' + redirectTo);
  if (redirectTo !== '') {
    dispatch(window.location.replace(redirectTo))
  }
}

export const setToken = token => dispatch => {
  setAxiosAuthToken(token);
  localStorage.setItem('token', JSON.stringify(token));
  dispatch(setmyToken(token));
}

export const unsetCurrentUser = () => dispatch => {
  setAxiosAuthToken("");
  localStorage.clear();
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("person");
  localStorage.removeItem("error");
  dispatch(unsetUser());
};

// export const logout = createAsyncThunk("auth/logout", async () => {
//   // axios.post("/accounts/token/logout/", "logout")
//   await authService.logout();

// });

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

// const initialState = user
//   ? { isLoggedIn: true, user }
//   : { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: user ? { isLoggedIn: true, user } : { isLoggedIn: false, user: null },
    token: auth_token ? { isAuthenticated: true, auth_token } : { isAuthenticated: false, auth_token: null },
  },
  reducers: {
    setmyToken: (state, action) => {
      state.isAuthenticated = true
      state.token = [action.payload]
    },
    setPerson: (state, action) => {
      state.person = [action.payload]
    },
    unsetUser: (state, action) => {
      state = {
        person: [],
        token: '',
        isAuthenticated: false
      }
    }
  },
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
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
      state.isAuthenticated = false;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { setUser, setPerson, setmyToken, unsetUser } = authSlice.actions
const { reducer } = authSlice;
export const showUser = (state) => state.auth;
/////////////////////
export default reducer;