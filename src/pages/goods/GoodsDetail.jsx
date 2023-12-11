import styled, { css } from "styled-components";
import { GoodsOption } from "../../components/goods/GoodsOption";
import { GoodsInfo } from "../../components/goods/GoodsInfo";
import { GoodsAxiosApi } from "../../api/goods/GoodsAxiosApi";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const GoodsDetailCss = styled.div`
 display: flex;
 flex-direction: row;
 width: 100%;
 height: auto;
 border: 3px solid red;
 margin-top: 100px;
 
 @media (max-width: 768px) {
  display:  grid;
  grid-template-columns: 100%;
        grid-template-rows: auto;
    grid-template-areas:  
      'option'
      'info'     
    ;
  }

`;


export const GoodsDetail=()=>{
   const {num} = useParams();
   const [list,setList] = useState('')
    useEffect(()=>{   
        const InsertGoodsLIst = async () => {
          try {
            const rsp = await  GoodsAxiosApi.getGoods(num);
            console.log(rsp.data);
            setList(rsp.data);
          } catch (error) {
            console.log(error);
          }
        };
        InsertGoodsLIst();
      },[]);
      
      const { goodsCategory, goodsDeliveryFee, goodsDesc, goodsDetailId, goodsPic, goodsPrice, goodsRefund, goodsTitle, memberDto } = list;
      const goodsInfoList = [goodsDetailId,goodsDesc,goodsPic];
    //   const goodsOptionList = [goodsDeliveryFee,goodsCategory,list.memberDto.nickName,list.memberDto.nickName];
    return(
        <GoodsDetailCss>
            <GoodsInfo list ={goodsInfoList}></GoodsInfo>
            <GoodsOption list={list}></GoodsOption>
        </GoodsDetailCss>
    )
}