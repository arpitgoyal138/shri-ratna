export const checkIfUserIsAdmin = (currentUser) => {
  console.log("checkIfUserIsAdmin: ", currentUser);
  if (!currentUser || !Array.isArray(currentUser.userRoles)) return false;
  const { userRoles } = currentUser;
  if (userRoles.includes("admin")) return true;
  return false;
};
