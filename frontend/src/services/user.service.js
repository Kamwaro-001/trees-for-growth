import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/";

const getPublicContent = () => {
  // return axios.get(API_URL + "accounts/users");
  return axios.get(API_URL + "api/users");
};

const getUserBoard = () => {
  // return axios.get(API_URL + "accounts/users/me", { headers: authHeader() });
  return axios.get(API_URL + "api/users/", { headers: authHeader() });
};

// const getModeratorBoard = () => {
//   return axios.get(API_URL + "mod", { headers: authHeader() });
// };

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const userService = {
  getPublicContent,
  getUserBoard,
//   getModeratorBoard,
  getAdminBoard,
};

export default userService