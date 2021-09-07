import styled from "styled-components";
import { Link as LinkRouter } from "react-router-dom";
import { Link as LinkScroll } from "react-scroll";

export const Nav = styled.nav`
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;
  transition: 0.8s all ease;
  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
  background-color: ${({ currentUser }) =>
    currentUser ? "#444444" : "#000000d6"};
  box-shadow: ${({ currentUser }) => (!currentUser ? "0 2px 4px #cbcbcb" : "")};
`;

export const NavbarContainer = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  z-index: 1;
  width: 100%;
  padding: 0 20px;
  transition: ease-in-out 0.5s;
`;

export const NavLogo = styled(LinkRouter)`
  color: #efefef;
  justify-self: flex-start;
  cursor: pointer;
  font-size: 2rem;
  display: flex;
  align-items: center;
  margin-left: 0;
  font-weight: bold;
  text-decoration: none;
  text-shadow: 1px 1px 3px 3px #000;
  transition: 0.5s ease-in-out;
  &:hover {
    color: yellow;
  }
`;

export const MobileIcon = styled.div`
  display: none;
  transition: 0.3s ease-in-out;
  @media screen and (max-width: 640px) {
    /* display: block; */
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 50%);
    font-size: 1.8rem;
    cursor: pointer;
    color: #efefef;
    display: ${({ isMenuOpen }) => (isMenuOpen ? "none" : "block")};
  }
`;

export const NavMenu = styled.ul`
  align-items: center;
  list-style: none;
  text-align: center;
  margin-right: 0px;
  display: ${({ currentUser }) => (currentUser ? "none" : "flex")};

  @media screen and (max-width: 920px) {
    display: ${({ currentUser }) => (!currentUser ? "" : "none")};
  }
`;

export const NavItem = styled.li`
  height: -webkit-fill-available;
  display: contents;
`;
export const NavLinks = styled(LinkScroll)`
  color: #efefef;
  display: flex;
  text-decoration: none;
  padding: 5px;
  margin: 0 1rem;
  height: 100%;
  cursor: pointer;
  letter-spacing: 1px;
  text-shadow: 1px 1px 3px 3px #000;
  /* transition: 0.3s ease; */

  /* &:hover {
    color: yellow;
    border-bottom: 2px solid yellow;
  }
  &.active {
    color: yellow;
    border-bottom: 2px solid yellow;
  } */
`;

export const LogoutBtn = styled.button`
  background: none;
  border: 0;
  color: #efefef;
  font-size: 1.5rem;
  cursor: pointer;
  height: inherit;
  padding: 10px;
  &:hover {
    background-color: #fff;
    opacity: 0.6;
    color: #000000 !important;
    transition: all 0.4s ease-in-out;
  }
`;
export const SignInBtn = styled.button`
  background: none;
  border: 0;
  color: #efefef;
  font-size: 1.5rem;
  cursor: pointer;
  height: inherit;
  padding: 10px;
  &:hover {
    background-color: #fff;
    opacity: 0.6;
    color: #000000 !important;
    transition: all 0.4s ease-in-out;
  }
`;
