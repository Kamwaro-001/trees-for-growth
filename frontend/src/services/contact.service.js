import axios from "axios";

const sendMessage = (data) => {
  return axios
    .post("/api/contact/", data)
}

const contactService = {
  sendMessage
}

export default contactService;