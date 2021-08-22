import styled from "styled-components";

export const PageContainer = styled.div`
  display: block;
  height: calc(100vh - 60px);
  width: 100vw;
  background: #f4f4f4;
  padding-top: 5vh;
`;

export const LoginBox = styled.div`
  margin: auto;
  display: block;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  text-align: center;
  width: 40%;
  /* box-shadow: 0px 0px 2px #ccc; */
  padding-bottom: 1rem;
  height: 40vh;
  background: #fff;
  /* border-radius: 5px; */
  border: 1px solid #ccc;
  @media screen and (max-width: 480px) {
    width: 70%;
  }
  @media screen and (min-width: 481px) and (max-width: 760px) {
    width: 80%;
  }
  @media screen and (min-width: 761px) and (max-width: 1200px) {
    width: 56%;
  }
`;

export const LoginBoxHeading = styled.p`
  background: #f7f7f7;
  text-align: left;
  color: #484848;
  padding: 8px;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #ccc;
`;

export const LockIcon = styled.div`
  margin: 0 10px;
  display: inline;
  font-size: 0.8rem;
`;

export const Label = styled.label`
  display: block;
  text-align: left;
  width: 96%;
  /* padding: 5px; */
  margin: 1% 2%;
`;

export const Input = styled.input`
  display: block;
  width: 96%;
  padding: 5px;
  margin: 1% 2%;
  font-size: 1.1rem;
`;

export const LoginButton = styled.button`
  padding: 10px;
  justify-content: right;
  width: auto;
`;
