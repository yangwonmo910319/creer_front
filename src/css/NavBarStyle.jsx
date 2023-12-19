import styled from "styled-components";
import { ReactComponent as Logo } from "../images/logo.svg";

export const StyledLogo = styled(Logo)`
  cursor: pointer;
`;

export const Top = styled.div`
  display: flex;
  /* justify-content: space-between; */
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: yellow;
`;

export const Welcome = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
`;
