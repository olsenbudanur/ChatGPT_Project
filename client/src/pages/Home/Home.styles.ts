import styled from "styled-components";



export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;



export const Sec1Wrapper = styled.div`
  /* width: 100%; */
  height: 100%;
  background-color: #1a58bc;
  display: grid;
  place-items: center;
  color: white;
`;


export const Sec2Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #d7e5fc;
  display: flex;
  flex-direction:column;
  place-items: center;
  color: black;
  @media (max-width: 900px) {
    padding: 0vh;
  }
`;

export const Sec3Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #1a58bc;
  display: flex;
  flex-direction:column;
  place-items: center;
  color: white;
  padding-top: 2vw;
`;

export const Image = styled.img`
  width: 300px;
  margin-bottom: 30px;
  /* @media (max-width:1000px) {
    height: 10%;
    width: 50%
  } */
`

export const ImageWrapper = styled.div`
  display: grid;
  justify-items:center;
  grid-template-columns: 20vw 20vw 20vw;
  grid-gap: 100px;

  padding: 5px;
  @media (max-width: 1000px) {
    grid-template-columns: none;
    width: 80%;
    grid-template-rows: 1fr 1fr 1fr;
    grid-gap: 0px;
    margin-top: 0vh;

  }
`

export const stepsWrapper = styled.div`
  place-items: center;
  display: flex;
  flex-direction:column;
  /* padding-right: 5vh; */
  /* padding-left: 5vh; */
`;

export const TextLoginWrapper = styled.div`
  display: grid;
  
  grid-template-columns: 20vw 25vw;
  grid-gap: 20vh;
  
  margin-top: 5vh;
  margin-bottom: 5vh;
  padding: 5vh;
  @media (max-width: 1000px) {
    grid-template-columns: none;
    width: 80%;
    grid-template-rows: 1fr 1fr;
    grid-gap: 0px;
    margin-top: 0vh;
    padding: 1vh;
  }
`;

export const TextWrapper = styled.div``;

export const LoginWrapper = styled.div`
  background-color: white;
  border-radius: 5px;
  text-align: center;
  padding: 30px;
  display: grid;
  grid-gap: 20px;
  @media (max-width: 1000px) {
    padding: 15px;
    grid-gap: 0px;
  }
`;

export const Title = styled.h1``;

export const SubTitle = styled.h5``;

export const PagesWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5px;
`;

export const WordCount = styled.div`
  background-color: #d7d9de;
  text-align: center;
  border-radius: 5px;
  margin-top: 16px;
  display: grid;
  align-items: center;
  color: black;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
`;

export const LoginHeader = styled.h1`
  margin-bottom: 0px;
  color: black;
`;



export const CurrUser = styled.h4`
  border: 0px;
  margin: 0px;
  padding: 0px;
  color: black;
`