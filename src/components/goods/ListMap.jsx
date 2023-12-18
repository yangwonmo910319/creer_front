import styled, { css } from "styled-components";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { storage } from "../../api/FireBase";
import { Link } from "react-router-dom";


const ListItem = styled.li`
   width: 210px;
   height: auto;
   display: flex;
   flex-wrap: wrap;  
   flex-direction: column;
   margin-left: 20px;
   padding: 10px;
   @media (max-width: 768px) {
      width: 230px;
      margin: 0 auto;
        grid-area: option; 
    }
`;

const ListMapCss = styled.ul`
   width: 100%;
   height: auto;
   display: flex;
   flex-wrap: wrap;  
   flex-direction: row;
   justify-content: start;
   list-style: none;
 
`;
const Class1 = styled.div`
   margin: 0 auto;
   width: 200px;
   color: black;
   height: 300px;
   border: 1px solid #c3c3c3;
   padding: 10px;
   .member{
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin: 0;
   }
`;

const Class1img = styled.div`
   width: 100%;
   height: 150px;
   z-index: 1;
   img {
      width: 100%;
      height: 100%;
   }
   position: relative;
`;


const Class1Memberimg = styled.div`
  border-radius: 50%;
img{
   border-radius: 50%;
   width: 45px;
      height: 45px;
}
   
`
const ClassPeice = styled.div`
  color: #fc4343;
   width: 100%;
   height: 30px;
   font-size: 1.2em;
   text-align: right;
`;

const ClassTitle = styled.div`
   width: 100%;
   border:  2px solid rgba(0,0,0,0);
   min-height: 50px;
   height: auto;
   font-size: 1.2em;
`;

const ClassNick = styled.div`
   width: 100%;
   height: 20px;   border:  2px solid rgba(0,0,0,0);
   padding: 5px;
`;

const ClassCategory = styled.div`
   width: 40%;
   border:  1px solid #b7b5b5;
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
                     {/* 카테고리 */}
                     <ClassCategory>{item.goodsCategory}</ClassCategory>
                     {/* 상품 이미지 */}
                     <Class1img><img src={item.goodsPic} alt={item.goodsPic} /></Class1img>
                     <div className="member">
                        {/* 판매자 이미지 */}
                        <Class1Memberimg><img src={item.memberDto.image} alt={""} /></Class1Memberimg>
                        {/* 판매자 닉네임 */}
                        <ClassNick>{item.memberDto && item.memberDto.nickName}</ClassNick>
                     </div>
                     {/* 상품명 */}
                     <ClassTitle>{item.goodsTitle}</ClassTitle>
                     {/* 가격 */}
                     <ClassPeice>{item.goodsPrice}원</ClassPeice>
                  </Class1>
               </Link>
            </ListItem>
         ))}
      </ListMapCss>
   );
};
