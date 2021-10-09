import React from "react";
import { Link } from "react-router-dom";
import {
  ProductCard,
  ProductImg,
  ProductInfo,
  ProductName,
  ProductDesc,
  ProductPrice,
} from "../ProductElements";
import parse from "html-react-parser";
import Button from "./../../forms/Button";
import "./../../../assets/css/custom.scss";
const Product = ({
  documentID,
  productCategory,
  productDesc,
  productImages,
  productName,
  productPrice,
}) => {
  return (
    <div>
      <ProductCard>
        <Link
          style={{ color: "#444444", textDecoration: "none" }}
          to={`/products/${documentID}`}
        >
          <ProductImg src={productImages[0].url} alt={productName} />
        </Link>
        <ProductInfo>
          <ProductName>
            {productName.substring(0, 20)}
            {productName.length > 20 && <span>...</span>}
          </ProductName>
          {/* <ProductDesc>
              {parse(`${productDesc.substring(0, 20)}`)}
            </ProductDesc> */}
          {productPrice > 0 && (
            <ProductPrice>&#8377; {productPrice}</ProductPrice>
          )}
          {(productPrice === 0 || productPrice === "") && (
            <button className="get-latest-price-btn">Get Latest Price</button>
          )}
        </ProductInfo>
      </ProductCard>
    </div>
  );
};
export default Product;
