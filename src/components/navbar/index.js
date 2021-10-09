import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { WebsiteMenuItems } from "../menuItems";
import "./styles.scss";
import { useSelector, useDispatch } from "react-redux";

import { signOutUserStart } from "./../../redux/user/user.actions";
import { Link, useHistory } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
export default function Navbar() {
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
      <Link to="/">
        <h1 className="navbar-logo">
          श्री रत्न भण्डार <i className="fab fa-react"></i>
        </h1>
      </Link>

      <button className="menu-icon" onClick={toggleMenu}>
        {isMenuOpen && <CloseIcon className="mui-icon" />}
        {!isMenuOpen && <MenuIcon className="mui-icon" />}
      </button>
      <ul className={isMenuOpen ? "nav-menu active" : "nav-menu"}>
        {WebsiteMenuItems.map((item, index) => {
          return (
            <li key={index} onClick={toggleMenu}>
              <Link className={item.clsName} to={item.url}>
                {item.title}
              </Link>
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
            <i className="fas fa-sign-out-alt"></i>
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
            <i className="fas fa-sign-in-alt"></i>
          </Button>
        </>
      )}
    </nav>
  );
}
