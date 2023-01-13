import axios from "axios";
import { toast } from "react-toastify";
import { setAxiosAuthToken } from "../redux/utils/Utils";
import { Cookies } from "react-cookie";

const cookie = new Cookies()

const register = (username, email, password) => {
  return axios.post("/api/accounts/users/", {
    username,
    email,
    password,
  });
};

const login = async (email, password) => {
  const response = await axios
    .post("/api/accounts/token/login/", { email, password });
  if (response.data.auth_token) {
    setAxiosAuthToken(response.data.auth_token);

    cookie.set('loggedIn', response.data.auth_token)
  }
  return response.data;
};

const logout = async () => {
  await axios
    .post('/api/accounts/token/logout/');
  window.location.replace('/login');
  setAxiosAuthToken("");
  localStorage.clear();
  cookie.remove('loggedIn')
  cookie.remove('notifications')
  toast.success("logout successful");
};

const authService = {
  register,
  login,
  logout
};

export default authService;