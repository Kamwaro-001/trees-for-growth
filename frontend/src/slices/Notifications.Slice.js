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
  return response.data
})

export const deleteNotification = createAsyncThunk('notifications/delete', async ({ id }) => {
  const response = await notificationService.deleteNotification({ id })
  return response.data
})

export const unset = () => dispatch => {
  cookie.remove('notifications')
  return dispatch(unset())
}

const initialState = (all !== null) ? { isSet: true, all, unread: [] } : { isSet: false, all: [], unread: [] }

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
      state.unread = state.all.filter((item) => item.status === 'unread')
    })
    builder.addCase(getNotifications.rejected, (state) => {
      state.isSet = false
      state.all = []
      state.unread = []
    })
    builder.addCase(updateNotifications.fulfilled, (state, action) => {
      state.isSet = true
      const updated = state.all.map(item => {
        if (item.id === action.payload.id) {
          return { ...item, ...action.payload }
        }
        return item
      })
      state.all = updated
    })
    builder.addCase(updateNotifications.rejected, () => {
      toastAnError('An error occurred')
    })
    builder.addCase(deleteNotification.fulfilled, (state, action) => {
      state.isSet = true
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.all = state.all.filter((item) => item.id !== id)
      }
    })
    builder.addCase(deleteNotification.rejected, () => {
      toastAnError('An error occurred')
    })
  }
})

const { reducer } = notificationSlice;
export const showNotifications = (state) => state.notifications.all
export default reducer;