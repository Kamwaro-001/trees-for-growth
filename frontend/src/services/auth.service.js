import axios from "axios";
import { toast } from "react-toastify";
import { setAxiosAuthToken, toastOnError } from "../redux/utils/Utils";

const API_URL = "http://localhost:8000/";
const register = (username, email, password) => {
  return axios.post(API_URL + "api/accounts/users/", {
    username,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "api/accounts/token/login/", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.auth_token) {
        localStorage.setItem("user", JSON.stringify(response.data));
        setAxiosAuthToken(response.data);
      }
      return response.data;
    })
};

const logout = () => {
  setAxiosAuthToken("");
  localStorage.removeItem("user");
  toast.success("logout successful")
};

const authService = {
  register,
  login,
  logout
};

export default authService;