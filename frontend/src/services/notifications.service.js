import axios from "axios";
import { Cookies } from "react-cookie";

const GetNotifications = async () => {
  const setCookie = new Cookies()
  const response = await axios.get('/api/notifications/')
  setCookie.set('notifications', response.data)
  return response.data
}

const updateNotifications = ({data, id}) => {
  return axios.patch(`/api/notifications/${id}/`, data)
}

const notificationService = {
  GetNotifications,
  updateNotifications
}

export default notificationService;