import axios from "axios";
import { toast } from "react-toastify";
import { SET_CURRENT_USER, SET_TOKEN, UNSET_CURRENT_USER } from "./LoginTypes";
import { setAxiosAuthToken, toastOnError } from "../../Utils/Utils";
// find replace for push from connected-react-router!!

export const login = (userData, redirectTo) => dispatch => {
  axios
    .post("/api/accounts/token/login/", userData)
    .then(response => {
      const { auth_token } = response.data;
      setAxiosAuthToken(auth_token);
      dispatch(setToken(auth_token));
      dispatch(getCurrentUser(redirectTo));
    })
    .catch(error => {
      dispatch(unsetCurrentUser());
      toastOnError(error);
    });
};

export const getCurrentUser = redirectTo => dispatch => {
  axios
    .get("/api/accounts/users/me/")
    .then(response => {
      const user = {
        username: response.data.username,
        email: response.data.email
      };
      dispatch(setCurrentUser(user, redirectTo));
    })
    .catch(error => {
      dispatch(unsetCurrentUser());
      toastOnError(error);
    });
};
//////////////////////////////////////
export const setCurrentUser = (user,
  //  redirectTo
   ) => dispatch => {
  localStorage.setItem("user", JSON.stringify(user));
  dispatch({
    type: SET_CURRENT_USER,
    payload: user
  });

  // console.log("set user" + redirectTo);
  // if (redirectTo !== "") {
    // dispatch(push(redirectTo));
  // }
};

export const setToken = token => dispatch => {
  setAxiosAuthToken(token);
  localStorage.setItem("token", token);
  dispatch({
    type: SET_TOKEN,
    payload: token
  });
};

export const unsetCurrentUser = () => dispatch => {
  setAxiosAuthToken("");
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  dispatch({
    type: UNSET_CURRENT_USER
  });
};

export const logout = () => dispatch => {
  axios
    .post("/api/v1/token/logout/")
    .then(response => {
      dispatch(unsetCurrentUser());
      // dispatch(push("/"));
      toast.success("Logout successful.");
    })
    .catch(error => {
      dispatch(unsetCurrentUser());
      toastOnError(error);
    });
};