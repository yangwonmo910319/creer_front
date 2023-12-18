import styled, { css } from "styled-components";

import { useState } from "react";
import { ReviewAxiosApi } from "../../api/goods/ReviewAxiosApi";
import { ReviewBox } from "./ReviewBox";
const GoodsInfoCss = styled.div`
    width: 65%;
    height: auto;
    @media (max-width: 768px) {
        width: 500px;
        margin: 0 auto;
        grid-area: info; 
    }
   
`;
const ImgBox = styled.div`
    width: 100%;
    height: auto;
    border:  3px solid green;
    display: flex;
   justify-content: center;
    .mainImg{ 
        width: 450px;
        height: auto;
        border:  3px solid red;
        display: flex;
        justify-content: center;
        img{
        width: 400px;
        height: 400px;
    }
    }
    .subImg{
        width: 100px;
        height: auto;
        border:  3px solid red;
        img{
        width: 80px;
        height: 80px;
    }
    }
`;
const InfoBox = styled.div`
     
       width: 80%;
    height: auto;
    border:  1px solid black;
    margin: 20px auto;
     p{ margin: 0 auto;
         width: 400px;
        text-align: center;
     
    }
`;
const InfoCategory = styled.div`
 margin: 0 auto;
width: 80%;
height: 30px;
margin-top: 50px;
 display: flex;
 justify-content: space-around;
 border:  1px solid rgba(0, 0, 0, 0.192);
 border-left: none;
 border-right: none;
 font-family:Arial;
ul{  
  display: flex;
    li{  
     width: 150px;
     margin: 0 10%;
     height: 30px;
     display: flex;
     justify-content: center; 
     align-items: center;  


    }
}
`;

export const GoodsInfo = ({ list }) => {
    return (
        <GoodsInfoCss>
            <ImgBox>
                <div className="mainImg"> <img src={list[1]} /></div>
                <div className="subImg"> <img src={list[2]} /></div>
            </ImgBox>
            <InfoCategory>
                <ul>
                    <li>소개</li>
                    <li>댓글</li>
                    <li>판매자</li>

                </ul>
            </InfoCategory>
            <InfoBox>
                {/* 상품 정보 표시 */}
                <p style={{ marginTop: "50px" }}> {list[1]} </p>
                {/* 상품 리뷰 */}
                <ReviewBox goodsDetailId={list[0]}>
                </ReviewBox>
            </InfoBox>


        </GoodsInfoCss>
    )
}