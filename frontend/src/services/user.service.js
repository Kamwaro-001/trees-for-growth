import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/";
// let API_URL = "http://localhost:8000/";

// if (window.location.origin === "http://localhost:3000") {
//   API_URL = "http://127.0.0.1:8000";
// } else {
//   API_URL = window.location.origin;
// }


const getPublicContent = () => {
  // return axios.get(API_URL + "accounts/users");
  // return axios.get(API_URL + "api/users/");
  return axios.get('api/users/');
};

const getUserAddress = () => {
  return axios.get(API_URL + "api/address/");
}

const updateUserAddr = (id, data) => {
  return axios.patch(API_URL + `api/address/${id}/`,data)
}

const getUserBoard = () => {
  // return axios.get(API_URL + "accounts/users/me/", { headers: authHeader() });
  return axios.get(API_URL + "api/users/", { headers: authHeader() });
};

const updateUserInfo = (id, data) => {
  // TODO implement this on user profile -- board user
  return axios.patch(API_URL + `api/users/${id}/`,data);
}

// const getModeratorBoard = () => {
//   return axios.get(API_URL + "mod", { headers: authHeader() });
// };

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const userService = {
  getPublicContent,
  getUserBoard,
  getUserAddress,
  updateUserAddr,
//   getModeratorBoard,
  getAdminBoard,
  updateUserInfo,
};

export default userService