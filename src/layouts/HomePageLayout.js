import React from "react";
import Navbar2 from "../components/navbar2";

const HomePageLayout = (props) => {
  return (
    <div className="fullHeight">
      <Navbar2 {...props} />
      {props.children}
    </div>
  );
};

export default HomePageLayout;
