import styled from "styled-components";
import { ReactComponent as Logo } from "../images/logo.svg";

export const Top = styled.div`
  margin-top: 10px;
  width: 100%;
  height: 190px;
  display: grid;
  grid-template-columns: 30% 40% 30%;
  grid-template-rows: 40% 30% 30%;
  grid-template-areas:
    "topL topC topR"
    "topL topC midR"
    "bottomL bottomC bottomR";
`;

export const TopR = styled.div`
  width: 100%;
  height: 100%;
  font-size: 1rem;
  grid-area: topR;
  display: flex;
  justify-content: end;

  span {
    font-weight: bold;
  }
`;

export const TopL = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  grid-area: topL;
  width: 100%;
  height: 100%;
`;

export const TopC = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-area: topC;
`;

export const StyledLogo = styled(Logo)`
  width: 80%;
  height: 80%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MidR = styled.div`
  max-width: 35vw;
  display: flex;
  justify-content: end;
  font-size: 1rem;
  grid-area: midR;
  width: 100%;
  height: 100%;
  list-style: none;

  li {
    margin: 0 10px;
    white-space: nowrap; // 텍스트 한줄로 표시
    overflow: hidden;
    text-overflow: ellipsis; // 텍스트가 넘칠 때 ... 로 표시
    cursor: pointer;
  }

  :hover {
    font-weight: bold;
  }
`;

export const BottomC = styled.div`
  font-size: 1rem;
  grid-area: bottomC;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: baseline;
`;
