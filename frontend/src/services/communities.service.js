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

const communitiesService = {
  myCommunities,
  communities,
  membership
}

export default communitiesService;