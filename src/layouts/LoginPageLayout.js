import React from "react";
import Navbar from "../components/navbar";

const LoginPageLayout = (props) => {
  return (
    <div className="fullHeight">
      <Navbar {...props} />
      {props.children}
    </div>
  );
};

export default LoginPageLayout;
