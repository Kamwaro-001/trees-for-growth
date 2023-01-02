import { createSlice } from "@reduxjs/toolkit"
import axios from "axios";

export const contactSlice = createSlice({
  name: "contact",
  initialState: {
    data: []
  },
  reducers: {
    sendMessage: (state, action) => {
      state.data.push(action.payload);
    }
  }
})

export const ContactAsync = (data) => async (dispatch) => {
  try {
    const response = await axios.post("/api/contact/", data);
    dispatch(sendMessage(response.data))
  } catch(e) {
    console.log(e)
  }
}

export const { sendMessage } = contactSlice.actions
export default contactSlice.reducer;