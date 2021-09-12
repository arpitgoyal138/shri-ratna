import productsTypes from "./product.types";

export const addProductStart = (productData) => ({
  type: productsTypes.ADD_NEW_PRODUCT_START,
  payload: productData,
});

export const fetchProductsStart = (filters = {}) => ({
  type: productsTypes.FETCH_PRODUCTS_START,
  payload: filters,
});

export const setProducts = (products) => ({
  type: productsTypes.SET_PRODUCTS,
  payload: products,
});

export const deleteProductStart = (productID) => ({
  type: productsTypes.DELETE_PRODUCT_START,
  payload: productID,
});

export const fetchProductStart = (productID) => ({
  type: productsTypes.FETCH_PRODUCT_START,
  payload: productID,
});

export const setProduct = (product) => ({
  type: productsTypes.SET_PRODUCT,
  payload: product,
});

//////////////
export const addCategoryStart = (categoryData) => ({
  type: productsTypes.ADD_NEW_CATEGORY_START,
  payload: categoryData,
});
export const updateCategoryStart = (categoryData) => ({
  type: productsTypes.UPDATE_CATEGORY_START,
  payload: categoryData,
});
export const fetchCategoriesStart = (filters = {}) => ({
  type: productsTypes.FETCH_CATEGORIES_START,
  payload: filters,
});

export const setCategories = (categories) => ({
  type: productsTypes.SET_CATEGORIES,
  payload: categories,
});

export const deleteCategoryStart = (categoryID) => ({
  type: productsTypes.DELETE_CATEGORY_START,
  payload: categoryID,
});

export const fetchCategoryStart = (categoryID) => ({
  type: productsTypes.FETCH_CATEGORY_START,
  payload: categoryID,
});

export const setCategory = (category) => ({
  type: productsTypes.SET_CATEGORY,
  payload: category,
});
