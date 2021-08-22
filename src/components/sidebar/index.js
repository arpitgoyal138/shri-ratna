import React from "react";
import {
  SidebarContainer,
  Icon,
  CloseIcon,
  SidebarWrapper,
  SidebarMenu,
  SidebarLink,
} from "./SidebarElements";
const Sidebar = ({ isOpen, toggle }) => {
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
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
            onClick={toggle}
          >
            मंदिर, मूर्तियां व पूजा सामग्री आदि
          </SidebarLink>
          <SidebarLink
            to="about"
            smooth={true}
            exact="true"
            offset={-80}
            onClick={toggle}
          >
            ज्योतिष परामर्श
          </SidebarLink>
          <SidebarLink
            to="about"
            smooth={true}
            exact="true"
            offset={-80}
            onClick={toggle}
          >
            परिचय जानें
          </SidebarLink>
          <SidebarLink
            to="about"
            smooth={true}
            exact="true"
            offset={-80}
            onClick={toggle}
          >
            सम्पर्क करें
          </SidebarLink>
        </SidebarMenu>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
