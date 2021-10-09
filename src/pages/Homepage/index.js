import React from "react";
import AboutUs from "../../components/aboutUs";
import IntroSlider from "../../components/introSlider";
import ProductResults from "../../components/productResults";

const Home = () => {
  return (
    <>
      <IntroSlider />
      <ProductResults id="products" heading="Some Products" />
      <AboutUs id="about" />
    </>
  );
};
Home.displayName = "Home";
export default Home;
