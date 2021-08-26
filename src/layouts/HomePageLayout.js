import react, { useState } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

const HomePageLayout = (props) => {
  return (
    <div className="fullHeight">
      <Navbar {...props} />
      <Sidebar {...props} />
      {props.children}
    </div>
  );
};

export default HomePageLayout;
