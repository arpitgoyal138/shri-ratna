import React from "react";
import Navbar from "../components/navbar";

const HomePageLayout = (props) => {
  return (
    <div className="fullHeight">
      <Navbar {...props} />
      {props.children}
    </div>
  );
};

export default HomePageLayout;
