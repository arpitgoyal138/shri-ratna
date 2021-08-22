import React, { useState, useEffect } from "react";

const ProductDetail = ({ match }) => {
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
