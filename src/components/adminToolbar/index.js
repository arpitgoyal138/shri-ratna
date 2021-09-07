import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { checkIfUserIsAdmin } from "../../utils";

import "./styles.scss";
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
export default function AdminToolbar() {
  const { currentUser } = useSelector(mapState);
  const isAdmin = checkIfUserIsAdmin(currentUser);
  if (!isAdmin) return null;
  return (
    <div className="adminToolbar">
      <ul>
        <li>
          <Link to="/admin">
            <FaUserCircle
              style={{ verticalAlign: "bottom", marginRight: "5px" }}
            ></FaUserCircle>
            My Admin
          </Link>
        </li>
      </ul>
    </div>
  );
}
