import { auth } from "./../../firebase/utils";
import { takeLatest, put, all, call } from "redux-saga/effects";
import { setProducts, setProduct, fetchProductsStart } from "./product.actions";
import {
  handleAddProduct,
  handleUpdateProduct,
  handleFetchProducts,
  handleFetchProduct,
  handleDeleteProduct,
} from "./product.helpers";
import productTypes from "./product.types";

export function* addProduct({ payload }) {
  try {
    console.log("payload: ", payload);
    const timestamp = new Date();
    yield handleAddProduct({
      ...payload,
      productAdminUserUID: auth.currentUser.uid,
      createdDate: timestamp,
    });
    yield put(fetchProductsStart());
  } catch (err) {}
}

export function* onAddProductStart() {
  yield takeLatest(productTypes.ADD_NEW_PRODUCT_START, addProduct);
}

export function* updateProduct({ payload, documentID }) {
  try {
    console.log("updateProduct payload: ", payload, " docID:", documentID);
    const timestamp = new Date();
    yield handleUpdateProduct({
      payload: {
        ...payload,
        productAdminUserUID: auth.currentUser.uid,
        updatedDate: timestamp,
      },
      documentID,
    });
    yield put(fetchProductsStart());
  } catch (err) {}
}

export function* onUpdateProductStart() {
  yield takeLatest(productTypes.UPDATE_PRODUCT_START, updateProduct);
}
export function* fetchProducts({ payload }) {
  try {
    const products = yield handleFetchProducts(payload);
    yield put(setProducts(products));
  } catch (err) {}
}

export function* onFetchProductsStart() {
  yield takeLatest(productTypes.FETCH_PRODUCTS_START, fetchProducts);
}

export function* deleteProduct({ payload }) {
  try {
    yield handleDeleteProduct(payload);
    yield put(fetchProductsStart());
  } catch (err) {}
}

export function* onDeleteProductStart() {
  yield takeLatest(productTypes.DELETE_PRODUCT_START, deleteProduct);
}

export function* fetchProduct({ payload }) {
  try {
    const product = yield handleFetchProduct(payload);
    yield put(setProduct(product));
  } catch (err) {}
}

export function* onFetchProductStart() {
  yield takeLatest(productTypes.FETCH_PRODUCT_START, fetchProduct);
}

export default function* productsSagas() {
  yield all([
    call(onAddProductStart),
    call(onUpdateProductStart),
    call(onFetchProductsStart),
    call(onDeleteProductStart),
    call(onFetchProductStart),
  ]);
}
