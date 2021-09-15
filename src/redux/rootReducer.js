import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import productReducer from "./products/product.reducers";
import categoryReducers from "./categories/category.reducers";
export default combineReducers({
  user: userReducer,
  productsData: productReducer,
  categoriesData: categoryReducers,
});
