import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import productReducer from "./products/product.reducers";
export default combineReducers({
  user: userReducer,
  productsData: productReducer,
});
