import { ADD_TREE, GET_TREE } from "./treestTypes";
import axios from "axios";

export const getTree = () => dispatch => {
    axios
        .get("/api/trees/")
        .then(response => {
            dispatch({
                type: GET_TREE,
                payload: response.data
            });
        })
        .catch(error => {
            // toastOnError(error);
            console.log(error)
        });
}

export const addTree = tree => dispatch => {
    axios
        .post("/api/trees/", tree)
        .then(response => {
            dispatch({
                type: ADD_TREE,
                payload: response.data
            });
        })
        .catch(error => {
            // toastOnError(error);
            console.log(error)
        });
}