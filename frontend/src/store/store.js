import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../slices/auth";
import messageReducer from "../slices/message";
import communitySlice from '../slices/Communities.slice';
import memberSlice from '../slices/Members.slice';
import treeSlice from '../slices/Trees.slice';
import accountSlice from '../slices/Account.Slice';
import userSlice from '../slices/users.slice';
import userReducer from '../slices/mytest.Slice'


const reducer = {
  auth: authReducer,
  message: messageReducer,
  communities: communitySlice,
  members: memberSlice,
  trees: treeSlice,
  account: accountSlice,
  userinfo: userSlice,
  user: userReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;