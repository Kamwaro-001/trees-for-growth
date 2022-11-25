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
      if (response.data.auth_token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      if (response.data.username) {
        localStorage.setItem("userName", JSON.stringify(response.data));
      }

      return response.data;
    });
};
// TODO fix here 🥲
const loggedUser = () => {
  return axios
  .get(API_URL + "accounts/users/me/")
  .then(resp => {
    return resp.data.username
  })
}

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("userName");
};

const authService = {
  register,
  login,
  logout,
  loggedUser
};

export default authService;