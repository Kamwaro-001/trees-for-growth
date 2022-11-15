import axios from "axios";

const API_URL = "http://localhost:8000/";

const register = (username, email, password) => {
// signup
  return axios.post(API_URL + "accounts/users/", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    // signin
    .post(API_URL + "accounts/token/login/", {
      username,
      password,
    })
    .then((response) => {
      // if (response.data.accessToken) {
      if (response.data.auth_token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;