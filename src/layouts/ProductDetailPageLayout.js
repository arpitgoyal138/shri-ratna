import React from "react";
import Navbar from "../components/navbar";

const ProductDetailPageLayout = (props) => {
  console.log("ProductDetailPageLayout props:", props);
  return (
    <div className="fullHeight">
      <Navbar {...props} />
      {props.children}
    </div>
  );
};

export default ProductDetailPageLayout;
