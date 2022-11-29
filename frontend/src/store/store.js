import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../slices/auth";
import messageReducer from "../slices/message";
import communitySlice from '../slices/Communities.slice';
import memberSlice from '../slices/Members.slice';
import treeSlice from '../slices/Trees.slice';

const reducer = {
  auth: authReducer,
  message: messageReducer,
  communities: communitySlice,
  members: memberSlice,
  trees: treeSlice
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;