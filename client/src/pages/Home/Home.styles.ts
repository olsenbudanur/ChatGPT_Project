import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  background-color: #1a58bc;

  display: grid;
  place-items: center;

  color: white;
`;

export const TextLoginWrapper = styled.div`
  display: grid;
  grid-template-columns: 300px 400px;
  grid-gap: 30vh;
  
  margin-top: 200px;
  margin-bottom: 200px;
  padding: 10px;

  @media (max-width: 1000px) {
    grid-template-columns: none;
    width: 80%;
    grid-template-rows: 1fr 1fr;
    grid-gap: 0px;
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