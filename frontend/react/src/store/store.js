import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../slices/auth";
import messageReducer from "../slices/message";
import communitySlice from '../slices/Communities.slice';
import memberSlice from '../slices/Members.slice';
import treeSlice from '../slices/Trees.slice';
import userSlice from '../slices/users.slice';
import accountReducer from "../slices/Account.Slice";
import contactReducer from "../slices/Contact.Slice";
import notificationReducer from "../slices/Notifications.Slice";


const reducer = {
  auth: authReducer,
  message: messageReducer,
  communities: communitySlice,
  members: memberSlice,
  trees: treeSlice,
  userinfo: userSlice,
  account: accountReducer,
  contact: contactReducer,
  notifications: notificationReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;