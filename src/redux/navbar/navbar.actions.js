import navbarTypes from "./navbar.types";

export const setChangeBackgroundAction = (val) => ({
  type: navbarTypes.SET_CHANGE_BG,
  payload: val,
});

export const setShowMenuAction = (val) => ({
  type: navbarTypes.SET_SHOW_MENU,
  payload: val,
});

export const setIsMenuOpenAction = (val) => ({
  type: navbarTypes.SET_IS_MENU_OPEN,
  payload: val,
});
