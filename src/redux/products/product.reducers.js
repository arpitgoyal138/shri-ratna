import productTypes from "./product.types";

const INITIAL_STATE = {
  products: [],
  product: {},
  categories: [],
  category: {},
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case productTypes.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case productTypes.SET_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };
    case productTypes.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case productTypes.SET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
