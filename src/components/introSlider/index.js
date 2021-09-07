import React from "react";
import Image1 from "../../assets/images/slider1.jpg";
import Image3 from "../../assets/images/zodiac-signs.jpg";
import Image2 from "../../assets/images/slider3.jpg";

import {
  IntroSliderContainer,
  IntroBg,
  TextOverImage,
} from "./IntroSliderElements";
import { Carousel } from "react-responsive-carousel";
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";

const legendStyle = {
  color: "#efefef",
  fontSize: "2rem",
  padding: "10px",
  opacity: "1",
  background: "#00000080",
  fontWeight: "bold",
  marginBottom: "5vh",
};

const IntroSlider = () => {
  return (
    <IntroSliderContainer id="home">
      <IntroBg>
        <Carousel
          showThumbs={false}
          autoPlay={true}
          infiniteLoop={true}
          showStatus={false}
          dynamicHeight={true}
          style={{ height: "100vh" }}
        >
          <div>
            <img
              src={Image1}
              style={{ height: "100vh", objectFit: "cover" }}
              alt="Stones, gems"
            />
            <p className="legend" style={legendStyle}>
              राशि के नग-नगीने, रुद्राक्ष, चंदन, शंख एवं पूजन सामग्री आदि
            </p>
          </div>
          <div>
            <img
              src={Image2}
              style={{ height: "100vh", objectFit: "cover" }}
              alt="temples, idols, dresses"
            />
            <p className="legend" style={legendStyle}>
              मंदिर, शिवलिंग, धातु की मूर्तियां व उन्के वस्त्र, आभूषण इत्यादि
            </p>
            {/* <TextOverImage>
              मंदिर, शिवलिंग, धातु की मूर्तियां व उन्के वस्त्र, आभूषण इत्यादि
            </TextOverImage> */}
          </div>
          <div>
            <img
              src={Image3}
              style={{ height: "100vh", objectFit: "cover" }}
              alt="Kundali, Astrology"
            />
            <p className="legend" style={legendStyle}>
              जन्म कुण्डली की विस्तार पूर्वक जानकारी व कुण्डली मिलान
            </p>
          </div>
        </Carousel>
        {/* <ImageBg src={Image} /> */}
        {/* <VideoBg
           autoPlay={true}
           loop
           muted={true}
           src={Video}
           type="video/mp4"
         /> */}
        {/* <TextOverImage>Shri Ratna Bhandar</TextOverImage> */}
      </IntroBg>
    </IntroSliderContainer>
  );
};

export default IntroSlider;
