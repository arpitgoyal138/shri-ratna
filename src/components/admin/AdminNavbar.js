import React from "react";
import { FaBars } from "react-icons/fa";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
} from "../navbar/NavbarElements";
import { animateScroll as scroll } from "react-scroll";

const toggleHome = () => {
  scroll.scrollToTop();
};
const AdminNavbar = ({ changeNavBg, isOpen, toggle }) => {
  return (
    <>
      <Nav>
        <NavbarContainer
          style={{ backgroundColor: "#ffffff", boxShadow: "1px 1px 3px #ccc" }}
          changeNavBg={changeNavBg}
        >
          <NavLogo
            style={{ color: "rgb(202 0 0)" }}
            to="/"
            onClick={toggleHome}
          >
            श्री रत्न भण्डार
          </NavLogo>
          <MobileIcon
            style={{ color: "rgb(202 0 0)" }}
            isOpen={isOpen}
            onClick={toggle}
          >
            <FaBars />
          </MobileIcon>
          <NavMenu>
            <NavItem>
              <NavLinks
                to="products"
                smooth={true}
                // duration={500}
                spy={true}
                exact="true"
                offset={-80}
              >
                {/* मंदिर, मूर्तियां व पूजा सामग्री आदि */}
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
                {/* ज्योतिष परामर्श */}
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
                {/* परिचय जानें */}
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
                {/* सम्पर्क करें */}
              </NavLinks>
            </NavItem>
          </NavMenu>
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default AdminNavbar;
