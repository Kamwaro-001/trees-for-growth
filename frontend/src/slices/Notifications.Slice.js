import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";
import { toastAnError } from "../redux/utils/Utils";
import notificationService from "../services/notifications.service";

const cookie = new Cookies()
const all = cookie.get('notifications')

export const getNotifications = createAsyncThunk('notifications/getall', async () => {
  const data = await notificationService.GetNotifications()
  return data;
})

export const updateNotifications = createAsyncThunk('notifications/update', async ({ data, id }) => {
  const response = await notificationService.updateNotifications({ data, id })
  return response
})

export const unset = () => dispatch => {
  cookie.remove('notifications')
  return dispatch(unset())
}

// unread: all.filter(a => a.status === 'unread')

// const initialState = (all !== null) ? { isSet: true, all, unread: [] } : { isSet: false, all: [], unread: [] }

const initialState = {
  all: [],
  unread: [],
  isSet: []
}

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    unSet: (state) => {
      state.isSet = false
      state.all = []
      state.unread = []
    }
  },
  extraReducers: builder => {
    builder.addCase(getNotifications.fulfilled, (state, action) => {
      state.isSet = true
      state.all = action.payload
      state.unread = action.payload.filter(a => a.status === 'unread')
    })
    builder.addCase(getNotifications.rejected, (state) => {
      state.isSet = false
      state.all = []
      state.unread = []
    })
    builder.addCase(updateNotifications.fulfilled, (state, action) => {
      state.isSet = true
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.all = state.all.map((item) =>
          item._id === id ? action.payload : item
        )
      }
    })
    builder.addCase(updateNotifications.rejected, () => {
      toastAnError('An error occurred')
    })
  }
})

const { unSet } = notificationSlice.actions
const { reducer } = notificationSlice;
export const showNotifications = (state) => state.notifications.all
export default reducer;