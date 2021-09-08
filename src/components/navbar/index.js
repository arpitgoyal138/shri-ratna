import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { WebsiteMenuItems } from "../menuItems";
import "./styles.scss";
import { useSelector, useDispatch } from "react-redux";

import { signOutUserStart } from "./../../redux/user/user.actions";
import { useHistory } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
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

      <button className="menu-icon" onClick={toggleMenu}>
        {isMenuOpen && <CloseIcon className="mui-icon" />}
        {!isMenuOpen && <MenuIcon className="mui-icon" />}
      </button>
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
        <>
          <Button
            className="button"
            variant="contained"
            onClick={() => signOut()}
          >
            Logout
          </Button>
          <Button className="button-mobile" onClick={() => signOut()}>
            <i class="fas fa-sign-out-alt"></i>
          </Button>
        </>
      )}
      {!currentUser && (
        <>
          <Button
            className="button"
            variant="contained"
            onClick={() => signIn()}
          >
            Login
          </Button>
          <Button className="button-mobile" onClick={() => signIn()}>
            <i class="fas fa-sign-in-alt"></i>
          </Button>
        </>
      )}
    </nav>
  );
}
