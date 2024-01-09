import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";
import FootBar from "./Foot";
import styled from "styled-components";

const MainCss = styled.div`
  max-width: 1280px;
  min-width: 768px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto;
  grid-template-areas:
    "top"
    "middle"
    "bottom";
  gap: 12px;
  .border{
    left: 0;
    position: absolute;
    width: 100vw;
    border-bottom:1px solid black;
  }
`;
const NavCss = styled.div`
  grid-area: top;
`;
const Content = styled.div`
  grid-area: middle;
`;
const FootCss = styled.div`
  grid-area: bottom;
  .border{
    left: 0;
    position: absolute;
    width: 100vw;
    border-bottom:1px solid black;
  }
`;
export const Main = () => {
  return (
    <MainCss>
      <NavCss>
        <NavBar></NavBar>

      </NavCss>
      <Content>
        <Outlet></Outlet>
      </Content>
      <FootCss>
        <div className="border"></div>
        <FootBar></FootBar>
      </FootCss>
    </MainCss>
  );
};
