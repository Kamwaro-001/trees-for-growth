import axios from "axios";
import { toast } from "react-toastify";
import * as Icons from "react-bootstrap-icons";

export const setAxiosAuthToken = token => {
  if (typeof token !== "undefined" && token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const toastOnError = error => {
  if (error.response) {
    toast.error(JSON.stringify(error.response.data));
  } else if (error.message) {
    toast.error(JSON.stringify(error.message));
  } else {
    toast.error(JSON.stringify(error));
  }
};

export const toastOnSuccess = success => {
  toast.success(success, { icon: <Icons.EmojiSmile /> })
}

export const toastOnWarn = warn => {
  toast.warn(warn, { icon: <Icons.ShieldExclamation /> })
}

export const toastAnError = err => {
  toast.error(err, { icon: <Icons.ExclamationCircle /> })
}


export const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);