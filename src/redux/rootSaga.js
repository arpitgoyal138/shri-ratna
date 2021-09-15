import { all, call } from "redux-saga/effects";
import productsSagas from "./products/product.sagas";
import userSagas from "./user/user.sagas";
import categoriesSagas from "./categories/category.sagas";

export default function* saga() {
  yield all([call(userSagas), call(productsSagas), call(categoriesSagas)]);
}
