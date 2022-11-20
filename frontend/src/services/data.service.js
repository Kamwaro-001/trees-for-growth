import axios from "axios";
import { ADD_COMMUNITY, GET_COMMUNITIES } from "./data.types";
// import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/";

const getCommunities = () => {
  return axios.get(API_URL + "api/communities/")
}

// const addCommunity = (data={}) => dispatch => {
//   console.log("data sent")
//   axios
//     .post(API_URL + "api/communities/", data)
//     .then(response => {
//       console.log("the data sent is " + response.data)
//       dispatch({
//         type: ADD_COMMUNITY,
//         payload: response.data
//       });
//     })
//     .catch(error => {
//       console.log(error)
//     });
// }

const addCommunity = (data) => {
  return axios.post(API_URL + "api/communities/",data)
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
  addCommunity
};

export default dataService