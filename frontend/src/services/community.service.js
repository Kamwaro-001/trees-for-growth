import axios from "axios";
import { useEffect, useState } from "react";
import userService from "./user.service";

const API_URL = "http://localhost:8000/";

const IdUser = () => {
  const [userinfo, setUserInfo] = useState([]);

  useEffect(() => {
    getUserId()
  }, []);
  const getUserId = () => {
    userService.getUserBoard()
      .then(response => {
        setUserInfo(response.data)
      })
      .catch(e => {
        console.log(e)
      });
  }

  let id;
  userinfo.map((getid) => (
    id = getid.id
  ))

  return id
}



const communityService = {
  IdUser
}

export default communityService;