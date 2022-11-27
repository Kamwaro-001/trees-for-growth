import axios from "axios";
// import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/";
// let API_URL = "http://localhost:8000/";

// if (window.location.origin === "http://localhost:3000") {
//   API_URL = "http://127.0.0.1:8000";
// } else {
//   API_URL = window.location.origin;
// }


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

const findByTreeName = name => {
  return axios.get(`api/trees?name=${name}`)
}

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

export default dataService;