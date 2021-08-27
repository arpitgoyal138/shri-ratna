import navbarTypes from "./navbar.types";

const INITIAL_STATE = {
  changeNavBg: false,
  isMenuOpen: false,
  showMenu: true,
};

const navbarReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case navbarTypes.SET_CHANGE_BG:
      return {
        ...state,
        changeNavBg: action.payload,
      };
    case navbarTypes.SET_SHOW_MENU:
      return {
        ...state,
        showMenu: action.payload,
      };
    case navbarTypes.SET_IS_MENU_OPEN:
      return {
        ...state,
        isMenuOpen: action.payload,
      };
    default:
      return state;
  }
};

export default navbarReducer;
