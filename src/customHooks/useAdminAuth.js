import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { checkIfUserIsAdmin } from "./../utils";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const useAdminAuth = (props) => {
  const history = useHistory();
  const { currentUser } = useSelector(mapState);
  useEffect(() => {
    if (!checkIfUserIsAdmin(currentUser)) {
      history.push("/login");
    }
  }, [currentUser]);
  return currentUser;
};

export default useAdminAuth;
