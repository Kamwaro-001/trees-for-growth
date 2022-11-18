import axios from "axios";
// import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/";

const getCommunities = () => {
  return axios.get(API_URL + "api/communities/")
}

const getTrees = () => {
  return axios.get(API_URL + "api/trees/");
};

const updateTree = (id, data) => {
  // TODO implement this on user profile -- board user
  return axios.patch(API_URL + `api/trees/${id}`,data);
}

const dataService = {
  getCommunities,
  getTrees,
  updateTree
};

export default dataService