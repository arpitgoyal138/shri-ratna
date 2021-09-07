import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { WebsiteMenuItems } from "../menuItems";
import "./styles.scss";
import { useSelector, useDispatch } from "react-redux";

import { signOutUserStart } from "./../../redux/user/user.actions";
import { useHistory } from "react-router-dom";
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
export default function Navbar2() {
  const { currentUser } = useSelector(mapState);
  const dispatch = useDispatch();
  const history = useHistory();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const signOut = () => {
    dispatch(signOutUserStart());
  };
  const signIn = () => {
    history.push("/login");
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <nav className="navbarItems">
      <a href="/">
        <h1 className="navbar-logo">
          श्री रत्न भण्डार <i className="fab fa-react"></i>
        </h1>
      </a>

      <div className="menu-icon" onClick={toggleMenu}>
        <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul className={isMenuOpen ? "nav-menu active" : "nav-menu"}>
        {WebsiteMenuItems.map((item, index) => {
          return (
            <li key={index}>
              <a className={item.clsName} href={item.url}>
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
      {currentUser && (
        <Button
          style={{
            position: "absolute",
            right: "0",
            top: "0",
            transform: "translate(-20%, 35%)",
          }}
          variant="contained"
          onClick={() => signOut()}
        >
          Logout
        </Button>
      )}
      {!currentUser && (
        <Button
          style={{
            position: "absolute",
            right: "0",
            top: "0",
            transform: "translate(-20%, 35%)",
          }}
          variant="contained"
          onClick={() => signIn()}
        >
          Login
        </Button>
      )}
    </nav>
  );
}
