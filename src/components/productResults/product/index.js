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
      <Link
        style={{ color: "#444444", textDecoration: "none" }}
        to={`/products/${documentID}`}
      >
        <ProductCard>
          <ProductImg src={productImages[0].url} alt={productName} />
          <ProductInfo>
            <ProductName>
              {productName.substring(0, 20)}
              {productName.length > 20 && <span>...</span>}
            </ProductName>
            {/* <ProductDesc>
              {parse(`${productDesc.substring(0, 20)}`)}
            </ProductDesc> */}
            <ProductPrice>&#8377;{productPrice}</ProductPrice>
          </ProductInfo>
        </ProductCard>
      </Link>
    </div>
  );
};
export default Product;
