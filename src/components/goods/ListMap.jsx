import styled, { css } from "styled-components";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { storage } from "../../api/FireBase";
import { Link } from "react-router-dom";


const ListItem = styled.li`
   border: 3px solid pink;
   width: 300px;
   height: auto;
   display: flex;
   flex-wrap: wrap;  
   flex-direction: column;
   margin-left: 10px;
   @media (max-width: 768px) {
      width: 300px;
      margin: 0 auto;
        grid-area: option; 
    }
`;

const ListMapCss = styled.ul`
   border: 3px solid green;
   width: 100%;
   height: auto;
   display: flex;
   flex-wrap: wrap;  
   flex-direction: row;
   justify-content: start;
   list-style: none;
 
`;
const Class1 = styled.div`
   border: 3px solid blue;
   margin: 0 auto;
   width: 200px;
   color: black;
   height: 300px;
   /* border: 1px solid rgba(0,0,0,0.2); */
   padding: 20px;
`;

const Class1img = styled.div`
   width: 100%;
   height: 150px;
   background-color: #d4868692;
   z-index: 1;
   img {
      width: 100%;
      height: 100%;
   }
   position: relative;
`;

const ClassLevel = styled.div`
   width: 100%;
   height: 20px;
`;

const ClassPeice = styled.div`
   width: 100%;
   height: 60px;
   font-size: 1.2em;
   text-align: right;
`;

const ClassTitle = styled.div`
   width: 100%;
   height: 70px;
   font-size: 1.2em;
`;

const ClassNick = styled.div`
   width: 100%;
   height: 20px;
   padding: 5px;
`;

const ClassCategory = styled.div`
   width: 40%;
   text-align: center;
   margin-bottom: -30px;
   z-index: 2;
   position: relative;
   height: 20px;
   background-color:  #ffffff;
   border-radius: 10px;
`;

export const ListMap = ({ list }) => {
   return (
      <ListMapCss>
         {list && list.map((item, index) => (
            <ListItem key={index}>
               <Link className="" to={`/goods/${item.goodsDetailId}`}>
                  <Class1>   
                     <ClassCategory>{item.goodsCategory}</ClassCategory>  
                     <Class1img><img src={item.goodsPic} alt={item.goodsPic} /></Class1img>    
                     <ClassNick>{item.memberDto && item.memberDto.nickName}</ClassNick>
                     <ClassTitle>{item.goodsTitle}</ClassTitle>   
                     <ClassPeice>{item.goodsPrice}원</ClassPeice> 
                  </Class1>
               </Link>
            </ListItem>
         ))}
      </ListMapCss>
   );
};
