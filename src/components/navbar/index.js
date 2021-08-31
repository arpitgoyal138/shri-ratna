import React from "react";
import { FaBars, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
  LogoutBtn,
  SignInBtn,
} from "./NavbarElements";
import { animateScroll as scroll } from "react-scroll";
import { useSelector, useDispatch } from "react-redux";

import { signOutUserStart } from "./../../redux/user/user.actions";
import { useHistory } from "react-router-dom";
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
const toggleHome = () => {
  scroll.scrollToTop();
};

const Navbar = (props) => {
  const { currentUser } = useSelector(mapState);
  const dispatch = useDispatch();
  const history = useHistory();
  const signOut = () => {
    dispatch(signOutUserStart());
  };
  const signIn = () => {
    history.push("/login");
  };
  return (
    <>
      <Nav>
        <NavbarContainer currentUser={currentUser}>
          <NavLogo to="/" onClick={toggleHome}>
            श्री रत्न भण्डार
          </NavLogo>
          {/* <MobileIcon
            isOpen={isMenuOpen}
            onClick={toggleSidebar}
            showMenu={showMenu}
          >
            <FaBars />
          </MobileIcon> */}
          {currentUser && (
            <NavMenu logout={true}>
              <NavItem>
                <LogoutBtn onClick={() => signOut()}>
                  {/* <FaSignOutAlt /> */}
                  Logout
                </LogoutBtn>
              </NavItem>
            </NavMenu>
          )}
          {!currentUser && (
            <NavMenu>
              <NavItem>
                <SignInBtn onClick={() => signIn()}>
                  {/* <FaSignInAlt /> */}
                  Login
                </SignInBtn>
              </NavItem>
            </NavMenu>
          )}
          {/* <NavMenu currentUser={currentUser}>
            <NavItem>
              <NavLinks
                to="products"
                smooth={true}
                // duration={500}
                spy={true}
                exact="true"
                offset={-80}
              >
                मंदिर, मूर्तियां व पूजा सामग्री आदि
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks
                to="about"
                smooth={true}
                duration={500}
                spy={true}
                exact="true"
                offset={-80}
              >
                ज्योतिष परामर्श
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks
                to="about"
                smooth={true}
                duration={500}
                spy={true}
                exact="true"
                offset={-80}
              >
                परिचय जानें
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks
                to="about"
                smooth={true}
                duration={500}
                spy={true}
                exact="true"
                offset={-80}
              >
                सम्पर्क करें
              </NavLinks>
            </NavItem>
          </NavMenu> */}
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default Navbar;
