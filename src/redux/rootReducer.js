import { combineReducers } from "redux";
import navbarReducer from "./navbar/navbar.reducer";
import userReducer from "./user/user.reducer";
import productReducer from "./products/product.reducers";
export default combineReducers({
  user: userReducer,
  navbar: navbarReducer,
  productsData: productReducer,
});
