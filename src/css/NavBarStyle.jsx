import styled from "styled-components";
import { ReactComponent as Logo } from "../images/logo.svg";

export const StyledLogo = styled(Logo)`
  cursor: pointer;
`;

export const Top = styled.div`
  width: 100%;
  background-color: yellow;

  .up {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  .down {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ul {
    width: 288px;
    background-color: aqua;
    display: flex;
    flex-direction: column;
    justify-content: right;

    // 로그인 X
    .notLogged {
      background-color: yellowgreen;
      list-style: none;
      padding: 10px;
      margin: 10px;
    }

    .zero {
      background-color: red;
      display: flex;
      justify-content: right;
    }

    // 로그인
    .Logged {
      background-color: blueviolet;
      list-style: none;
      padding: 10px;
      margin: 10px;
      white-space: nowrap; // 텍스트 한줄로 표시
    }

    .two {
      display: flex;
    }
  }
`;

export const Welcome = styled.div`
  width: 100%;
  font-weight: bold;
  font-size: 1.5rem;
  background-color: green;
`;
