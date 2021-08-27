import { combineReducers } from "redux";
import navbarReducer from "./navbar/navbar.reducer";
import userReducer from "./user/user.reducer";

export default combineReducers({
  user: userReducer,
  navbar: navbarReducer,
});
