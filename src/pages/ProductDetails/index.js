import React, { useEffect } from "react";
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
  // console.log("productID:", productID, " product:", product);
  useEffect(() => {
    dispatch(fetchProductStart(productID));
    return () => {
      dispatch(setProduct({}));
    };
  }, []);
  const { productName, productImages, productDesc, productPrice } = product;

  return (
    <div className="pro-detail-container">
      <div className="carousel-container">
        <Carousel
          showThumbs={product && productImages && productImages.length > 1}
          autoPlay={false}
          infiniteLoop={false}
          showStatus={false}
          dynamicHeight={false}
        >
          {product &&
            productImages &&
            productImages.map((img, index) => {
              return (
                <div key={index} style={{ height: "65vh" }}>
                  <Image
                    src={img.url}
                    aspectRatio="1"
                    animationDuration="2000"
                    cover="true"
                    alt={productName}
                  />
                </div>
              );
            })}
        </Carousel>
      </div>
      <div className="pro-info-container">
        {productName && <h1 className="pro-name">{productName}</h1>}
        {productPrice !== 0 && <p>Rs. {productPrice}</p>}
        {productDesc && <p className="pro-desc">{parse(`${productDesc}`)}</p>}
      </div>
    </div>
  );
};
ProductDetails.displayName = "ProductDetails";

export default ProductDetails;
