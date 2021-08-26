import React, { useState } from "react";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import EmailPassSignIn from "../login/index.js";
const theme = createTheme({
  typography: {
    fontFamily: [
      "Calibri",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
});
const Admin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [changeNavBg, setNavBg] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const changeNavBackground = () => {
    if (window.scrollY >= window.innerHeight - 280) {
      setNavBg(true);
    } else {
      setNavBg(false);
    }
  };
  window.addEventListener("scroll", changeNavBackground);
  return (
    <>
      <ThemeProvider theme={theme}>
        <AdminSidebar isOpen={isOpen} toggle={toggle} />
        <AdminNavbar
          changeNavBg={changeNavBg}
          isOpen={isOpen}
          toggle={toggle}
        />
        <EmailPassSignIn />
      </ThemeProvider>
    </>
  );
};

export default Admin;
