import axios from "axios";
import { Cookies } from "react-cookie";

const cookie = new Cookies()

const getCurrentUserInfo = async () => {
  const response = await axios.get('/api/accounts/users/me/');
  cookie.set('user', response.data)
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