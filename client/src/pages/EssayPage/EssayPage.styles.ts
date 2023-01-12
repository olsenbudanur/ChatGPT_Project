import styled from "styled-components";

interface IB {
  disp: string,
}

export const Paper = styled.div`
  position: relative;
  background: #fff;
  width: 50%;
  margin: 0px auto;
  box-shadow: 0px 2px 38px rgba(0, 0, 0, 0.2);
  min-height: 900px;
  @media (max-width: 1000px) {
    grid-template-columns: none;
    width: 80%;
    grid-template-rows: 1fr 1fr 1fr;
    grid-gap: 0px;
    margin-top: 0vh;
  }
`;

export const OuterLayer = styled.div`
  background: rgb(204, 204, 204);
  padding-bottom: 100px;
`;

export const EssayText = styled.div`
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;

  line-height: 40px;
  @media (max-width: 1000px) {
    grid-template-columns: none;
    font-size: small;
    grid-template-rows: 1fr 1fr 1fr;
    grid-gap: 0px;
    margin-top: 0vh;
  }
`;

export const EssayTitle = styled.div`
  text-align: center;
  font-weight: bold;
  padding-top: 60px;
  line-height: 40px;
`;


export const LoadingWrapper = styled.div<IB>`
    display: ${props => props.disp};
    flex-direction:column;
    place-items: center;
    margin: auto;
`;


export const ButtonsWrapper = styled.div`
  display: flex;
  /* flex-direction:column; */
  place-items: center;
  color: black;
  /* align-items: center; */
  justify-content: center;
  gap: 10px;
`




export const CopyWrapper = styled.div<IB>`
    display: ${props => props.disp};
`;
