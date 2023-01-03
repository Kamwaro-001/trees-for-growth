import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toastAnError, toastOnSuccess } from "../redux/utils/Utils";
import contactService from "../services/contact.service";

export const contactAsync = createAsyncThunk("contact/sendMessage", async (formValue) => {
  try {
    const response = await contactService.sendMessage(formValue)
    toastOnSuccess("Message sent successfully. We appreciate your feedback.")

    return response.data
  } catch (error) {
    toastAnError("An error occurred please try again")
  }
})

export const contactSlice = createSlice({
  name: "contact",
  initialState: {
    sent: false,
    data: []
  },
  extraReducers: builder => {
    builder.addCase(contactAsync.fulfilled, (state, action) => {
      state.sent = true
      state.data.push(action.payload)
    })
    builder.addCase(contactAsync.rejected, (state) => {
      state.sent = false
    })
  }
})

const { reducer } = contactSlice;
export default reducer;