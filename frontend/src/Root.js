import React from "react";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { applyMiddleware, createStore } from "redux";
import { routerMiddleware, ConnectedRouter } from "connected-react-router";
import { isEmpty } from "./utils/Utils"; // new imports
import rootReducer from "./Reducer";
import { setCurrentUser, setToken } from "./components/login/LoginActions";