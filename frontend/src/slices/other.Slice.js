import { createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { toastOnError } from "../redux/utils/Utils";

export const personSlice = createSlice({
  name: "person",
  initialState: {
    data: []
  },
  reducers: {
    getPerson: (state, action) => {
      state.data = [action.payload];
    },
    editPerson: (state, action) => {
      state.data.push(action.payload);
    }
  }
})

export const getPersonAsync = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/accounts/users/me/");
    dispatch(getPerson(response.data.username))
    localStorage.setItem("person", JSON.stringify(response.data));
  } catch (err) {
    toastOnError(err)
  }
}

export const editPersonAsync = (data) => async (dispatch) => {
  try {
    const response = await axios.patch("api/accounts/users/me/", data);
    dispatch(editPerson(response.data))
  } catch (err) {
    console.log(err)
  }
}

export const { getPerson, editPerson } = personSlice.actions
export const showPerson = (state) => state.person.data;
export default personSlice.reducer;