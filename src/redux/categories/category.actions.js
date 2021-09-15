import categoryTypes from "./category.types";

export const addCategoryStart = (categoryData) => ({
  type: categoryTypes.ADD_NEW_CATEGORY_START,
  payload: categoryData,
});
export const updateCategoryStart = (categoryData) => ({
  type: categoryTypes.UPDATE_CATEGORY_START,
  payload: categoryData,
});
export const fetchCategoriesStart = (filters = {}) => ({
  type: categoryTypes.FETCH_CATEGORIES_START,
  payload: filters,
});

export const setCategories = (categories) => ({
  type: categoryTypes.SET_CATEGORIES,
  payload: categories,
});

export const deleteCategoryStart = (categoryID) => ({
  type: categoryTypes.DELETE_CATEGORY_START,
  payload: categoryID,
});

export const fetchCategoryStart = (categoryID) => ({
  type: categoryTypes.FETCH_CATEGORY_START,
  payload: categoryID,
});

export const setCategory = (category) => ({
  type: categoryTypes.SET_CATEGORY,
  payload: category,
});
