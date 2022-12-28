import axios from "axios";

const getCurrentUserInfo = async () => {
  const response = await axios.get('/api/accounts/users/me/');
  localStorage.setItem('user', JSON.stringify(response.data));
  return response.data;
}

const accountService = {
  getCurrentUserInfo,
}

export default accountService;