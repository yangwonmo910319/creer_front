import styled from "styled-components";
import { Slide } from "../components/Test/Slide";
import { Slide2 } from "../components/Test/Slide2";

const HomeCss=styled.div`
  width  :100% ;
  height: 1200px;

`;

export const Home = () =>{
    return(
        <HomeCss>
      <Slide/>
        <Slide2></Slide2>
        </HomeCss>
    )
}