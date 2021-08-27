import React from "react";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
  LogoutBtn,
} from "./NavbarElements";
import { animateScroll as scroll } from "react-scroll";
import { auth } from "../../firebase/utils";
import { connect } from "react-redux";
import {
  setIsMenuOpenAction,
  setShowMenuAction,
} from "../../redux/navbar/navbar.actions";

const toggleHome = () => {
  scroll.scrollToTop();
};

const Navbar = (props) => {
  const {
    setIsMenuOpen,
    setShowMenu,
    changeNavBg,
    isMenuOpen,
    showMenu,
    currentUser,
  } = props;
  const page = props.children.type.name;
  const pagesWithoutMenu = ["Login", "Recovery", "Admin", "Registration"];
  console.log("page:", page);
  if (pagesWithoutMenu.includes(page)) {
    console.log("hide menu");
    setIsMenuOpen(false);
    setShowMenu(false);
  }
  const toggleSidebar = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <Nav>
        <NavbarContainer changeNavBg={changeNavBg} showMenu={showMenu}>
          <NavLogo to="/" onClick={toggleHome}>
            श्री रत्न भण्डार
          </NavLogo>
          <MobileIcon
            isOpen={isMenuOpen}
            onClick={toggleSidebar}
            showMenu={showMenu}
          >
            <FaBars />
          </MobileIcon>
          {currentUser && !showMenu && (
            <NavMenu showMenu={false} logout={true}>
              <NavItem>
                <LogoutBtn onClick={() => auth.signOut()}>
                  <FaSignOutAlt />
                </LogoutBtn>
              </NavItem>
            </NavMenu>
          )}
          <NavMenu showMenu={showMenu}>
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
          </NavMenu>
        </NavbarContainer>
      </Nav>
    </>
  );
};

const mapStateToProps = ({ user, navbar }) => ({
  currentUser: user.currentUser,
  changeNavBg: navbar.changeNavBg,
  isOpen: navbar.isOpen,
  showMenu: navbar.showMenu,
});
const mapDispatchToProps = (dispatch) => ({
  setIsMenuOpen: (navbar) => dispatch(setIsMenuOpenAction(navbar)),
  setShowMenu: (navbar) => dispatch(setShowMenuAction(navbar)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
