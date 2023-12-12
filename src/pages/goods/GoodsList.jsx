import { SlideOne } from "../../components/goods/SlideOne"
import { Category } from "../../components/goods/Category"
import { ListMap } from "../../components/goods/ListMap"
import { useEffect, useState } from "react"
import { GoodsAxiosApi } from "../../api/goods/GoodsAxiosApi"
import styled from "styled-components"
import { Slide2 } from "../../components/home/Slide2"
const GoodsListCss = styled.div`
  width: 100%;
  height: auto;
  /* border: 5px solid #e9dd6f; */

`;

export const GoodsList=()=>{
  const [category,setCategory] = useState('all');
  const [list,setList] = useState();

  useEffect(()=>{   
    const InsertGoodsLIst = async () => {
      try {
        const rsp = await  GoodsAxiosApi.getGoodsList();
        console.log(rsp.data);
        setList(rsp.data);
      } catch (error) {
        console.log(error);
      }
    };
    InsertGoodsLIst();
  },[category])

    return(

        <GoodsListCss>
        {/* 이미지 슬라이드 */}
         <SlideOne/>
         <Slide2></Slide2>
         {/* 판매 리스트 카테고리 */}
         <Category setCategory={setCategory}/>

          {/* 판매 리스트 출력 */}   
          <ListMap list={list}></ListMap>
        </GoodsListCss>
    )
}