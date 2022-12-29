import axios from "axios";

const getCurrentUserInfo = async () => {
  const response = await axios.get('/api/accounts/users/me/');
  localStorage.setItem('user', JSON.stringify(response.data));
  return response.data;
}

const editCurrentUser = (data) => {
  return axios.patch('/api/accounts/users/me/', data)
}

const accountService = {
  getCurrentUserInfo,
  editCurrentUser
}

export default accountService;