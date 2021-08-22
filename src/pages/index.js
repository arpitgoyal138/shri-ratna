import React, { useState } from "react";
import AboutUs from "../components/aboutUs";
import IntroSlider from "../components/introSlider";
import Navbar from "../components/navbar";
import Products from "../components/products";
import { productData } from "../components/products/data";
import Sidebar from "../components/sidebar";
const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [changeNavBg, setNavBg] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const changeNavBackground = () => {
    if (window.scrollY >= window.innerHeight - 280) {
      setNavBg(true);
    } else {
      setNavBg(false);
    }
  };
  window.addEventListener("scroll", changeNavBackground);
  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar changeNavBg={changeNavBg} isOpen={isOpen} toggle={toggle} />
      <IntroSlider />
      <Products id="products" heading="Some Products" data={productData} />
      <AboutUs id="about" />
    </>
  );
};

export default Home;
