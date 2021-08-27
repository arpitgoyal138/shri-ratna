import React from "react";
import { Link } from "react-router-dom";
import { productData as data } from "./data";
import {
  ProductsContainer,
  ProductHeading,
  ProductWrapper,
  ProductCard,
  ProductImg,
  ProductInfo,
  ProductName,
  ProductDesc,
  ProductPrice,
} from "./ProductElements";
const Products = ({ heading }) => {
  return (
    <ProductsContainer id="products">
      <ProductHeading>{heading}</ProductHeading>
      <ProductWrapper>
        {data.map((product, index) => {
          return (
            <Link
              style={{ color: "#444444", textDecoration: "none" }}
              to={`/products/${product.id}`}
            >
              <ProductCard key={index}>
                <ProductImg src={product.img} alt={product.alt} />
                <ProductInfo>
                  <ProductName>{product.name}</ProductName>
                  <ProductDesc>{product.desc}</ProductDesc>
                  <ProductPrice>Rs. {product.price}</ProductPrice>
                </ProductInfo>
              </ProductCard>
            </Link>
          );
        })}
      </ProductWrapper>
    </ProductsContainer>
  );
};

export default Products;
