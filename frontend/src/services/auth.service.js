import axios from "axios";
import { toast } from "react-toastify";
import { setAxiosAuthToken } from "../redux/utils/Utils";


const register = (username, email, password) => {
  return axios.post("/api/accounts/users/", {
    username,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post("/api/accounts/token/login/", {
      email,
      password,
    })
    .then((response) => {
      // localStorage.setItem("userinfo", JSON.stringify(response.data));
      // axios.get("/api/accounts/users/me/")
      if (response.data.auth_token) {
        localStorage.setItem("user", JSON.stringify(response.data));
        setAxiosAuthToken(response.data.auth_token);
      }
      return response.data;
    })
};

const logout = () => {
  setAxiosAuthToken("");
  // TODO check to make sure localStorage is being cleared
  localStorage.removeItem("user");
  localStorage.removeItem("userinfo");
  localStorage.removeItem("person");
  toast.success("logout successful")
};

const authService = {
  register,
  login,
  logout
};

export default authService;