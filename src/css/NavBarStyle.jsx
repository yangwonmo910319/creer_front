import styled from "styled-components";
import { ReactComponent as Logo } from "../images/logo.svg";

export const StyledLogo = styled(Logo)`
width: 100%;
height: 100%;
  cursor: pointer;
  grid-area: topC;

`;

export const Top = styled.div`
margin-top: 10px;
  width: 100%;
  height: 150px;
display: grid;
  grid-template-columns: 30% 40% 30%; 
  grid-template-rows: 40% 30% 30% ;
  grid-template-areas:
    "topL topC topR"   
    "topL topC midR"   
    "bottomL bottomC bottomR";
`;
export const TopR = styled.div`
  width: 100%;
  height: 100%;
  font-weight: bold;
  font-size: 1rem;
  grid-area: topR;
  display: flex;
justify-content: end;
`;

export const TopL = styled.div`
  font-weight: bold;
  font-size: 1rem;
  grid-area: topL;
  width: 100%;
  height: 100%;
`;
export const MidR = styled.div`
display: flex;
justify-content: end;
  font-weight: bold;
  font-size: 1rem;
  grid-area: midR;
  width: 100%;
  height: 100%;
  list-style: none;
li{
  margin: 0 10px;
}
`;
export const BottomC = styled.div`
  font-weight: bold;
  font-size: 1rem;
  grid-area: bottomC;
  width: 100%;
  background-color: yellow;
`;

export const Welcome = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
`;
