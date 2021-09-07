import styled from "styled-components";

export const IntroSliderContainer = styled.div`
  /* background: #0c0c0c; */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  height: 100vh;
  position: relative;
  z-index: 1;
  @media screen and (max-width: 768px) {
    /* height: 45vh; */
  }
`;
export const IntroBg = styled.div`
  position: absolute;
  top: -60px;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  min-height: 100vh;
  padding-bottom: 1vh;
`;

export const ImageBg = styled.img`
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  background: #efefef;
`;

export const VideoBg = styled.video`
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  background: #232a34;
`;

export const TextOverImage = styled.p`
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100vw;
  text-align: center;
  padding-left: 10px;
  padding-right: 10px;
  color: #fff;
  font-size: 2rem;
  background: #0000005c;
`;
