import React from "react";
// import Navbar from "../components/navbar";
import Navbar2 from "../components/navbar2";

// import Sidebar from "../components/sidebar";

const HomePageLayout = (props) => {
  return (
    <div className="fullHeight">
      {/* <Navbar {...props} /> */}
      <Navbar2 {...props} />
      {/* <Sidebar {...props} /> */}
      {props.children}
    </div>
  );
};

export default HomePageLayout;
