import React from "react";
import Navbar2 from "../components/navbar2";

const ProductDetailPageLayout = (props) => {
  console.log("ProductDetailPageLayout props:", props);
  return (
    <div className="fullHeight">
      <Navbar2 {...props} />
      {props.children}
    </div>
  );
};

export default ProductDetailPageLayout;
