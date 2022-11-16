import axios from "axios";
// import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/";

const getTrees = () => {
  return axios.get(API_URL + "api/trees/");
};

const dataService = {
  getTrees
};

export default dataService