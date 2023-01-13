import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toastOnError } from "../redux/utils/Utils";
import { toast } from "react-toastify";

export const memberSlice = createSlice({
  name: "members",
  initialState: {
    data: []
  },
  reducers: {
    addMember: (state, action) => {
      state.data.push(action.payload);
    },
    getMembers: (state, action) => {
      state.data = [action.payload];
    }
  }
})

export const getMemberAsync = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/members/");
    dispatch(getMembers(response.data))
  } catch (err) {
    toastOnError(err)
  }
}

export const addMemberAsync = (data) => async (dispatch) => {
  try {
    const response = await axios.post("/api/members/", data);
    dispatch(addMember(response.data))
  } catch (err) {
    if (err.response.data.non_field_errors[0] === 'The fields user, member_to must make a unique set.') {
      toast.warn("You are already a member")
    } else {
      console.log(err)
    }
  }
}

export const { addMember, getMembers } = memberSlice.actions
export const showMember = (state) => state.members.data;
export default memberSlice.reducer;