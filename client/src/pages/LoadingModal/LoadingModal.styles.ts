import styled from "styled-components";

export const Body = styled.div`
    margin: 0;
    padding: 0;
    background: #262626;
`;


const anime = styled.div`
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #262626;
    animation: animate 10s ease-in forwards;
    animation-timing-function: steps(50, jump-start);
  }
  &:after {
    content: '\f040';
    font-family: fontAwesome;
    position: absolute;
    top: -45px;
    left: 0;
    width: 100%;
    height: 100%;
    background: #262626;
    animation: animate 10s ease-in forwards;
    color: #a9ff08;
    font-size: 50px;
    transform: translateX(2px);
    animation-timing-function: steps(50, jump-start);
  }
`;