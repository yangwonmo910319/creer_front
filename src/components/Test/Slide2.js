import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Test2 from "./Teset2"
import Test3 from "./Slide"
import Test4 from "./Teset4"
const Body =styled.div`
width: 1200px;
height: 3000px;
margin: 0 auto;
`;
const A =styled.div`
width: 100%;
height: 500px;
margin-top: 100px;

`;

const A1 =styled.div`

height:350px;
width: 90%;
/* https://image.istarbucks.co.kr/upload/common/img/main/2023/231116_christmas2_img.png) */
background: url("https://img.freepik.com/free-photo/dairy-star-trek-in-the-winter-woods-dramatic-and-picturesque-scene-in-anticipation-of-the-holiday-carpathian-ukraine_146671-14706.jpg?size=626&ext=jpg&ga=GA1.1.1880011253.1699920000&semt=sph") fixed;
background-size:100% 100%;
background-repeat: no-repeat;
position: relative;




p{
  font-family:sans-serif;
  color: white;
  width:50px;
  font-size: 4em;
  position: absolute;
  top: 100px;
  left: 150px;
  ${({ bb })=>
    bb == 0
    ? css`
            animation: slide 3s forwards;
          `
        : css`
            animation: slide2 3s forwards;
          `};
  }

  @keyframes slide {
    0% {
      opacity: 1;
      right: -100px;
    }
    100% {
      opacity: 0;
      right: 0px;
    }
  }

  @keyframes slide2 {
    0% {
      opacity: 0;
      left: -100px;
    }
    100% {
      opacity: 1;
      left: 150px;
    }
  }
`;

const Photo1 = styled.div`
  height: 500px;
  width: 450px;
  background: url("https://image.istarbucks.co.kr/upload/common/img/main/2023/christmas_img.png");
  background-size: 300px;
  background-repeat: no-repeat;
  position: absolute;
  top: 80px;
  right: ${({ asdw }) => (asdw > 100 ? '-50px' : '300px')}; 
  /* Adjust the position */
  opacity: ${({ asdw }) => (asdw > 100 ? '1' : '0')}; /* Initially hidden */
  transition: opacity 0.5s ease; /* Transition effect for opacity change */

  /* Additional styling or transform: translateX() can be added if needed */
`;

export const Slide2=()=> {
 const [position,setPosition ] =useState(0);
 const [asd,setasd ] =useState(20);
 const  onScroll=()=> {

setPosition(window.scrollY); }
useEffect(()=>{

window.addEventListener("scroll",onScroll);
return ()=>{ 
  window.removeEventListener("scroll",onScroll);
}

},[])
  return (
<Body>
  <A><A1 bb={position}>
    <Photo1 asdw={position}/><p>GjristMas Gifts</p>
  </A1></A>
     
</Body>
  );
}

