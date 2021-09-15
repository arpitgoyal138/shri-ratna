import { auth } from "../../firebase/utils";
import { takeLatest, put, all, call } from "redux-saga/effects";
import {
  setCategories,
  setCategory,
  fetchCategoriesStart,
} from "./category.actions";
import {
  handleAddCategory,
  handleUpdateCategory,
  handleFetchCategories,
  handleFetchCategory,
  handleDeleteCategory,
} from "./category.helpers";
import categoryTypes from "./category.types";

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
  yield takeLatest(categoryTypes.ADD_NEW_CATEGORY_START, addCategory);
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
  yield takeLatest(categoryTypes.UPDATE_CATEGORY_START, updateCategory);
}

export function* fetchCategories({ payload }) {
  try {
    const categories = yield handleFetchCategories(payload);
    yield put(setCategories(categories));
  } catch (err) {}
}

export function* onFetchCategoriesStart() {
  yield takeLatest(categoryTypes.FETCH_CATEGORIES_START, fetchCategories);
}

export function* deleteCategory({ payload }) {
  try {
    yield handleDeleteCategory(payload);
    yield put(fetchCategoriesStart());
  } catch (err) {}
}

export function* onDeleteCategoryStart() {
  yield takeLatest(categoryTypes.DELETE_CATEGORY_START, deleteCategory);
}

export function* fetchCategory({ payload }) {
  try {
    const category = yield handleFetchCategory(payload);
    yield put(setCategory(category));
  } catch (err) {}
}

export function* onFetchCategoryStart() {
  yield takeLatest(categoryTypes.FETCH_CATEGORY_START, fetchCategory);
}

export default function* categoriesSagas() {
  yield all([
    call(onAddCategoryStart),
    call(onUpdateCategoryStart),
    call(onFetchCategoriesStart),
    call(onDeleteCategoryStart),
    call(onFetchCategoriesStart),
  ]);
}
