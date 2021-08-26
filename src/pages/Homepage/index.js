import React, { useState } from "react";
import AboutUs from "../../components/aboutUs";
import IntroSlider from "../../components/introSlider";
import Products from "../../components/products";
import { productData } from "../../components/products/data";
const Home = () => {
  return (
    <>
      <IntroSlider />
      <Products id="products" heading="Some Products" data={productData} />
      <AboutUs id="about" />
    </>
  );
};

export default Home;
