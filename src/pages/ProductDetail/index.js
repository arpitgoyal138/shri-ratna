import React, { useEffect } from "react";

const ProductDetail = ({ match }) => {
  console.log("ProductDetail props:", match);
  useEffect(() => {
    console.log({ match });
  }, []);

  return (
    <>
      <h1>Detail Page</h1>
      <h2>Product id: {match.params.id}</h2>
    </>
  );
};

export default ProductDetail;
