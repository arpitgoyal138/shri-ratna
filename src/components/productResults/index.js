import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProductsStart,
  setProducts,
} from "../../redux/products/product.actions";
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
  console.log("products in ProductResults: ", products);

  if (!Array.isArray(products)) return null;
  if (products.length < 1) {
    return <h3>No search results.</h3>;
  }
  return (
    <ProductsContainer id="products">
      <ProductHeading>{heading}</ProductHeading>
      <ProductWrapper>
        {products.map((product, idx) => {
          const {
            documentID,
            productCategory,
            productDesc,
            productImages,
            productName,
            productPrice,
            productVisible,
          } = product;
          if (!productVisible) return null;
          const configProduct = {
            documentID,
            productCategory,
            productDesc,
            productImages,
            productName,
            productPrice,
          };
          return <Product {...configProduct} key={idx} />;
        })}
      </ProductWrapper>
    </ProductsContainer>
  );
};

export default ProductResults;
