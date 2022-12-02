import axios from "axios";
import authHeader from "./auth-header";

const getPublicContent = () => {
  // return axios.get(API_URL + "accounts/users");
  return axios.get('/api/users/');
};

const getUserAddress = () => {
  return axios.get("/api/address/");
}

const updateUserAddr = (id, data) => {
  return axios.patch(`/api/address/${id}/`,data)
}

const getUserBoard = () => {
  // return axios.get(API_URL + "accounts/users/me/", { headers: authHeader() });
  return axios.get("/api/users/", { headers: authHeader() });
};

const updateUserInfo = (id, data) => {
  // TODO implement this on user profile -- board user
  return axios.patch(`/api/users/${id}/`,data);
}

// const getModeratorBoard = () => {
//   return axios.get("mod", { headers: authHeader() });
// };

const getAdminBoard = () => {
  return axios.get("/admin/", { headers: authHeader() });
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