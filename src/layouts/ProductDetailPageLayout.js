import React from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

const ProductDetailPageLayout = (props) => {
  return (
    <div className="fullHeight">
      <Navbar {...props} />
      <Sidebar {...props} />
      {props.children}
    </div>
  );
};

export default ProductDetailPageLayout;
