import axios from "axios";
import { ADD_COMMUNITY, GET_COMMUNITIES } from "./data.types";
// import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/";

const getCommunities = () => {
  return axios.get(API_URL + "api/communities/")
}

const addCommunity = (data) => {
  return axios.post(API_URL + "api/communities/",data)
}

const joinCommunity = (data) => {
  return axios.post(API_URL + "api/members/", data)
}

const getTrees = () => {
  return axios.get(API_URL + "api/trees/");
};

const updateTree = (id, data) => {
  // TODO implement this on user profile -- board user
  return axios.patch(API_URL + `api/trees/${id}`, data);
}

const dataService = {
  getCommunities,
  getTrees,
  updateTree,
  addCommunity,
  joinCommunity
};

export default dataService