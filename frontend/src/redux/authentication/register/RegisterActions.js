import axios from "axios";
import { toast } from "react-toastify";
import { CREATE_USER_ERROR, CREATE_USER_SUBMITTED, CREATE_USER_SUCCESS } from "./RegisterTypes";

export const registerNewUser = userdata => dispatch => {
    dispatch({ type: CREATE_USER_SUBMITTED });
    axios
    .post("/api/accounts/users/", userdata)
    .then(response => {
        toast.success("Account for " + userdata.username + " created successfully. Please login.")
        dispatch({ type: CREATE_USER_SUCCESS });
    })
    .catch(error => {
        if (error.response) {
            toast.error(JSON.stringify(error.response.data))
            dispatch({
                type: CREATE_USER_ERROR,
                errorData: error.response.data
            })
        } else if (error.message) {
            // TODO make the error easy to understand!
            toast.error(JSON.stringify(error.message))
        } else {
            toast.error(JSON.stringify(error));
        }
    })
}