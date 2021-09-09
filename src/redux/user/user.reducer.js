import userTypes from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  recoverPasswordSuccess: false,
  userError: "",
  loading: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        userError: "",
        loading: false,
      };
    case userTypes.SIGN_OUT_USER_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE,
        loading: false,
      };
    case userTypes.RECOVER_PASSWORD_SUCCESS:
      return {
        ...state,
        recoverPasswordSuccess: action.payload,
        userError: "",
        loading: false,
      };

    case userTypes.USER_ERROR:
      return {
        ...state,
        userError: action.payload,
        loading: false,
      };
    case userTypes.IS_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
