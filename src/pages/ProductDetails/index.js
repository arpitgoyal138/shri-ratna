import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";

const ProductDetail = ({ match }) => {
  useEffect(() => {
    console.log({ match });
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
    <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar changeNavBg={false} isOpen={isOpen} toggle={toggle} showMenu={true} />
      <h1>Detail Page</h1>
      <h2>Product id: {match.params.id}</h2>
    </>
  );
};

export default ProductDetail;
