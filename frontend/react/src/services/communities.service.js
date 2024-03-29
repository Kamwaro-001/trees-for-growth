import axios from "axios";

const communities = async () => {
  const response = await axios.get('/api/communities/')
  return response.data
}

const myCommunities = async () => {
  const response = await axios.get('/api/mycommunities/')
  return response.data
}

const membership = async () => {
  const response = await axios.get('/api/mymembership/')
  return response.data
}

const leaveCommunity = (id) => {
  return axios.delete(`/api/mymembership/${id}/`)
}

const deleteComm = async(id) => {
  const response = await axios.delete(`/api/communities/${id}/`)
  return response.data
}

const communitiesService = {
  myCommunities,
  communities,
  membership,
  deleteComm,
  leaveCommunity
}

export default communitiesService;