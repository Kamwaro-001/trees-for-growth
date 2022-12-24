import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toastOnError } from "../redux/utils/Utils";

export const treeSlice = createSlice({
  name: "trees",
  initialState: {
    data: []
  },
  reducers: {
    addTree: (state, action) => {
      state.data.push(action.payload);
    },
    getTrees: (state, action) => {
      state.data = [action.payload];
    }
  }
})

export const getTreeAsync = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/trees/");
    dispatch(getTrees(response.data))
  } catch (err) {
    toastOnError(err)
  }
}

export const addTreeAsync = (data) => async (dispatch) => {
  try {
    const response = await axios.post("/api/trees/", data);
    dispatch(addTree(response.data));
  } catch (err) {
    toastOnError(err)
  }
}


export const { addTree, getTrees } = treeSlice.actions
export const showTree = (state) => state.trees.data;
export default treeSlice.reducer;