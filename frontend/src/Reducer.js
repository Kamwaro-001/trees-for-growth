import { combineReducers } from "redux";
// import { connectRouter }

//login reducer
import { loginReducer } from "./components/authentication/login/LoginReducer";

const createRootReducer = history =>
  combineReducers({
    // router: connectRouter(history),
  });

export default createRootReducer;