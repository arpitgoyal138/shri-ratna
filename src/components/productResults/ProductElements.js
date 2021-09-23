import styled from "styled-components";

export const ProductsContainer = styled.div`
  /* width: 100vw; */
  /* min-height: 100vh; */
  padding: 5rem calc((100vw-1300px) / 2);
  /* background: #150f0f; */
`;

export const ProductHeading = styled.h2`
  /* font-size: clamp(2rem, 2.5vw, 3rem); */
  font-size: 1.3rem;
  text-align: center;
  margin-bottom: 2vh;
  font-weight: 400;
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
  transition: 0.1s;
  &:hover {
    transform: scale(1.018);
    box-shadow: 1px 1px 5px;
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
  font-size: 1rem;
  /* margin: 0.5rem auto; */
  @media screen and (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* padding: 0 10px; */
  text-align: center;
  font-size: 1.1rem;
  @media screen and (max-width: 480px) {
    /* padding: 0 5px; */
  }
  /* margin: 0.5rem auto; */
`;

export const ProductDesc = styled.p`
  /* margin-bottom: 1rem; */
  /* margin: 0.5rem; */
`;

export const ProductPrice = styled.p`
  margin-bottom: 1vh;
  font-size: 1rem;
  font-weight: bold;
  @media screen and (max-width: 480px) {
    font-size: 0.85rem;
  }
  /* margin: 0.5rem auto; */
`;
