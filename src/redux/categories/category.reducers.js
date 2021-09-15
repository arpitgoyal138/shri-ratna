import categoryTypes from "./category.types";

const INITIAL_STATE = {
  categories: [],
  category: {},
};

const categoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case categoryTypes.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case categoryTypes.SET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    default:
      return state;
  }
};

export default categoryReducer;
