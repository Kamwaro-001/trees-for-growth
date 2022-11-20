import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../slices/auth";
import messageReducer from "../slices/message";
import { commReducer } from '../services/data.reducer';

const reducer = {
  auth: authReducer,
  message: messageReducer,
  communities: commReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;