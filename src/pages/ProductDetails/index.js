import React, { Children, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  fetchProductStart,
  setProduct,
} from "./../../redux/products/product.actions";
import { Carousel } from "react-responsive-carousel";
import parse from "html-react-parser";
import Image from "material-ui-image";
import "./styles.scss";
const mapState = ({ productsData }) => ({
  product: productsData.product,
});

const ProductDetails = ({}) => {
  const { productID } = useParams();
  const dispatch = useDispatch();
  const { product } = useSelector(mapState);
  useEffect(() => {
    dispatch(fetchProductStart(productID));
    return () => {
      dispatch(setProduct({}));
    };
  }, []);
  const { productName, productImages, productDesc, productPrice } = product;

  const renderThumbItems = () =>
    productImages.map((img) => {
      return <img src={img.url} alt={productName} />;
    });
  return (
    <div className="pro-detail-container">
      <div className="carousel-container">
        <Carousel
          showThumbs={product && productImages && productImages.length > 1}
          showIndicators={product && productImages && productImages.length > 1}
          autoPlay={false}
          infiniteLoop={false}
          showStatus={false}
          dynamicHeight={false}
          renderThumbs={renderThumbItems}
          thumbWidth={65}
        >
          {product &&
            productImages &&
            productImages.map((img, index) => {
              return (
                <div key={index} style={{ height: "50ch" }}>
                  <Image
                    src={img.url}
                    aspectRatio="1"
                    animationDuration="5000"
                    cover="true"
                    alt={productName}
                    style={{ padding: "0", position: "inherit" }}
                  />
                </div>
              );
            })}
        </Carousel>
      </div>
      <div className="pro-info-container">
        {productName && <h1 className="pro-name">{productName}</h1>}
        {productName && productPrice !== 0 && productPrice !== "" && (
          <p>Rs. {productPrice}</p>
        )}
        {(productPrice === "" || productPrice === 0) && (
          <button className="get-latest-price-btn">Get Latest Price</button>
        )}
        {productDesc && <p className="pro-desc">{parse(`${productDesc}`)}</p>}
      </div>
    </div>
  );
};
ProductDetails.displayName = "ProductDetails";

export default ProductDetails;
