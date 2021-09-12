import { auth } from "./../../firebase/utils";
import { takeLatest, put, all, call } from "redux-saga/effects";
import {
  setProducts,
  setProduct,
  fetchProductsStart,
  setCategories,
  setCategory,
  fetchCategoriesStart,
} from "./product.actions";
import {
  handleAddProduct,
  handleFetchProducts,
  handleFetchProduct,
  handleDeleteProduct,
  handleAddCategory,
  handleUpdateCategory,
  handleFetchCategories,
  handleFetchCategory,
  handleDeleteCategory,
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

////////////////// Categories //////////////////

export function* addCategory({ payload }) {
  try {
    console.log("addCategory payload: ", payload);
    const timestamp = new Date();
    yield handleAddCategory({
      ...payload,
      categoryAdminUserUID: auth.currentUser.uid,
      createdDate: timestamp,
    });
    yield put(fetchCategoriesStart());
  } catch (err) {}
}

export function* onAddCategoryStart() {
  yield takeLatest(productTypes.ADD_NEW_CATEGORY_START, addCategory);
}

export function* updateCategory({ payload }) {
  try {
    console.log("updateCategory payload: ", payload);
    yield handleUpdateCategory({
      ...payload,
    });
    yield put(fetchCategoriesStart());
  } catch (err) {}
}

export function* onUpdateCategoryStart() {
  yield takeLatest(productTypes.UPDATE_CATEGORY_START, updateCategory);
}

export function* fetchCategories({ payload }) {
  try {
    const categories = yield handleFetchCategories(payload);
    yield put(setCategories(categories));
  } catch (err) {}
}

export function* onFetchCategoriesStart() {
  yield takeLatest(productTypes.FETCH_CATEGORIES_START, fetchCategories);
}

export function* deleteCategory({ payload }) {
  try {
    yield handleDeleteCategory(payload);
    yield put(fetchCategoriesStart());
  } catch (err) {}
}

export function* onDeleteCategoryStart() {
  yield takeLatest(productTypes.DELETE_CATEGORY_START, deleteCategory);
}

export function* fetchCategory({ payload }) {
  try {
    const category = yield handleFetchCategory(payload);
    yield put(setCategory(category));
  } catch (err) {}
}

export function* onFetchCategoryStart() {
  yield takeLatest(productTypes.FETCH_CATEGORY_START, fetchCategory);
}

export default function* productsSagas() {
  yield all([
    call(onAddProductStart),
    call(onFetchProductsStart),
    call(onDeleteProductStart),
    call(onFetchProductStart),
    call(onAddCategoryStart),
    call(onUpdateCategoryStart),
    call(onFetchCategoriesStart),
    call(onDeleteCategoryStart),
    call(onFetchCategoriesStart),
  ]);
}
