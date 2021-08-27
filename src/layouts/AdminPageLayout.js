import React from "react";
import Navbar from "../components/navbar";

const AdminPageLayout = (props) => {
  console.log(props);
  return (
    <div className="fullHeight">
      <Navbar {...props} />
      {props.children}
    </div>
  );
};

export default AdminPageLayout;
