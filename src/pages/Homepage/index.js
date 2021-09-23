import React from "react";
import AboutUs from "../../components/aboutUs";
import IntroSlider from "../../components/introSlider";
import ProductResults from "../../components/productResults";
import { productData } from "../../components/productResults/data";

const Home = () => {
  return (
    <>
      <IntroSlider />
      <ProductResults
        id="products"
        heading="Some Products"
        data={productData}
      />
      <AboutUs id="about" />
    </>
  );
};
Home.displayName = "Home";
export default Home;
