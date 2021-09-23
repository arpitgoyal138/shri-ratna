import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsStart } from "../../redux/products/product.actions";
import { productData as data } from "./data";
import Product from "./product";
import {
  ProductsContainer,
  ProductHeading,
  ProductWrapper,
} from "./ProductElements";
const mapState = ({ productsData }) => ({
  products: productsData.products.data,
});
const ProductResults = ({ heading }) => {
  const dispatch = useDispatch();
  const { products } = useSelector(mapState);
  useEffect(() => {
    dispatch(fetchProductsStart());
  }, []);
  console.log("products: ", products);

  if (!Array.isArray(products)) return null;
  if (products.length < 1) {
    return <h3>No search results.</h3>;
  }
  return (
    <ProductsContainer id="products">
      <ProductHeading>{heading}</ProductHeading>
      <ProductWrapper>
        {products.map((product) => {
          const {
            documentID,
            productCategory,
            productDesc,
            productImages,
            productName,
            productPrice,
          } = product;
          const configProduct = {
            documentID,
            productCategory,
            productDesc,
            productImages,
            productName,
            productPrice,
          };
          return <Product {...configProduct} />;
        })}
      </ProductWrapper>
    </ProductsContainer>
  );
};

export default ProductResults;
