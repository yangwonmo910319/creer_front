import styled from "styled-components";

export const MiddleOrderBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
    button {
    border-radius: 13px;
    width: 85%;
    height: 43px;
    background-color: #ffffff;
    border: 1px solid rgb(153, 153, 153);
    position: relative;
  }
`;

export const MiddleOrderBoxRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const LeftOrderBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
