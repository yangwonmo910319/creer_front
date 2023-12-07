import { Outlet } from "react-router-dom";
import {NavBar} from "./NavBar";
import FootBar from "./Foot";
import styled from "styled-components"

const MainCss = styled.div`
  max-width: 1280px;
  min-width: 768px;
  margin  :0 auto ;
`;
const NavCss = styled.div`
 border-bottom:1px solid black ;
`;
const FootCss = styled.div`
 border-top:1px solid black ;
`;
export const Main = () =>{
    return(
        <>       
       <NavCss>
         <NavBar></NavBar>
         </NavCss>
         <MainCss>
        <Outlet></Outlet>
        </MainCss>
        <FootCss>
         <FootBar></FootBar>
         </FootCss>
        </>
    )
}
