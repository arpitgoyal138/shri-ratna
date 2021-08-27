import userTypes from "./user.types";

export const setCurrentUserAction = (user) => ({
  type: userTypes.SET_CURRENT_USER,
  payload: user,
});
