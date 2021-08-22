import styled from "styled-components";

export const ProductsContainer = styled.div`
  /* width: 100vw; */
  /* min-height: 100vh; */
  padding: 5rem calc((100vw-1300px) / 2);
  /* background: #150f0f; */
`;

export const ProductHeading = styled.h2`
  /* font-size: clamp(2rem, 2.5vw, 3rem); */
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 2vh;
`;

export const ProductWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
`;

export const ProductCard = styled.div`
  margin: 1vh;
  line-height: 1.5;
  box-shadow: 0px 1px 3px #ccc;
  transition:0.3s ;
  &:hover {
    transform: scale(1.05);
    /* box-shadow: 0 0 3px #ccc; */
  }
`;

export const ProductImg = styled.img`
  height: 250px;
  width: 250px;
  max-width: 100%;
  @media screen and (max-width: 768px) {
    height: 160px;
    width: 160px;
  }
  /* box-shadow: 1px 1px #efefef; */
`;

export const ProductName = styled.h3`
  font-weight: 400;
  font-size: 1.2rem;
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  text-align: center;
  font-size: 1rem;
`;

export const ProductDesc = styled.p`
  /* margin-bottom: 1rem; */
`;

export const ProductPrice = styled.p`
  margin-bottom: 1vh;
  font-size: 1rem;
  font-weight: bold;
`;
