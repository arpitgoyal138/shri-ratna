import React from "react";
import {
  SidebarContainer,
  Icon,
  CloseIcon,
  SidebarWrapper,
  SidebarMenu,
  SidebarLink,
} from "./SidebarElements";
import { connect } from "react-redux";
import { setIsMenuOpenAction } from "../../redux/navbar/navbar.actions";

const Sidebar = (props) => {
  console.log("sidebar props:", props);
  const { setIsMenuOpen, isMenuOpen } = props;

  const toggleSidebar = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <SidebarContainer isOpen={isMenuOpen} onClick={toggleSidebar}>
      <Icon onClick={toggleSidebar}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink
            to="products"
            // duration={500}
            // spy={true}
            smooth={true}
            exact="true"
            offset={-80}
            onClick={toggleSidebar}
          >
            मंदिर, मूर्तियां व पूजा सामग्री आदि
          </SidebarLink>
          <SidebarLink
            to="about"
            smooth={true}
            exact="true"
            offset={-80}
            onClick={toggleSidebar}
          >
            ज्योतिष परामर्श
          </SidebarLink>
          <SidebarLink
            to="about"
            smooth={true}
            exact="true"
            offset={-80}
            onClick={toggleSidebar}
          >
            परिचय जानें
          </SidebarLink>
          <SidebarLink
            to="about"
            smooth={true}
            exact="true"
            offset={-80}
            onClick={toggleSidebar}
          >
            सम्पर्क करें
          </SidebarLink>
        </SidebarMenu>
      </SidebarWrapper>
    </SidebarContainer>
  );
};
const mapStateToProps = ({ navbar }) => ({
  isMenuOpen: navbar.isMenuOpen,
});
const mapDispatchToProps = (dispatch) => ({
  setIsMenuOpen: (navbar) => dispatch(setIsMenuOpenAction(navbar)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
