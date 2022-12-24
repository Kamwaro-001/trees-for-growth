import axios from "axios";
import { toast } from "react-toastify";
import { setAxiosAuthToken } from "../redux/utils/Utils";
import { getCurrentUser, setmyToken, setToken, unsetCurrentUser } from "../slices/auth";


const register = (username, email, password) => {
  return axios.post("/api/accounts/users/", {
    username,
    email,
    password,
  });
};

const login = (email, password, redirectTo) => {
  return axios
    .post("/api/accounts/token/login/", { email, password })
    .then((response) => {

      return response.data
    })

};

// const logout = () => {
//   setAxiosAuthToken("");
//   // TODO check to make sure localStorage is being cleared
//   localStorage.removeItem("user");
//   localStorage.removeItem("userinfo");
//   localStorage.removeItem("person");
//   localStorage.clear();
//   toast.success("logout successful")
// };

const authService = {
  register,
  login,
  // logout
};

export default authService;