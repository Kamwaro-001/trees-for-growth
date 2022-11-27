import axios from "axios";

let API_URL = "http://localhost:8000/";

// if (window.location.origin === "http://localhost:3000") {
//   API_URL = "http://127.0.0.1:8000";
// } else {
//   API_URL = window.location.origin;
// }


const register = (username, email, password) => {
// signup
  return axios.post(API_URL + "accounts/users/", {
    username,
    email,
    password,
  });
};
// TODO fix here 🥲
function loggedUser (){
  return axios
  .get(API_URL + "accounts/users/me/")
  .then(resp => {
    localStorage.setItem("userName", JSON.stringify(resp.data.username)) 
  })
}

const login = (email, password) => {
  return axios
    // signin
    .post(API_URL + "accounts/token/login/", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.auth_token) {
        localStorage.setItem("user", JSON.stringify(response.data));
        loggedUser();
      }
      return response.data;
    });
};

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