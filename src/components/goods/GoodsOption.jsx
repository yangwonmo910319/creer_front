import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { GoodsAxiosApi } from "../../api/goods/GoodsAxiosApi";

const GoodsOptionCss=styled.div`
    width: 35%;
    height: auto;
    border: 3px solid green;
    @media (max-width: 768px) {
      width: 500px;
      margin: 0 auto;
        grid-area: option; 
    }
    div{
        margin: 20px 0;
    }
`;


const Seller=styled.div`
position: relative;
width: 100%;
height: 150px;
    display: flex;
border-bottom: 1px solid rgba(136, 136, 136, 0.673);
    /* justify-content: center; */
   align-items: center;

 
  
`;

const Seller1=styled.div`
   width: 100px;
   height: 100%;
    display: flex;
    /* justify-content: center; */
   align-items: center;
 
`;

const Seller2=styled.div`

  width:75%;
    display: flex;
    position: relative; 
    flex-direction: column;
    /* justify-content: center; */
   align-items: center;
   padding: 10px;

`;
const Optionimage=styled.div`  
   img{
    border-radius: 50px;
    border: 1px solid #a5a5a5;
    width: 100px;
   height: 100px;
   margin-bottom: 40px;
   }
`;
const OptionNick=styled.div`
  position: absolute;
    padding: 10px;
  left: 0;
  top: -25px;
`;
const OptionCategory=styled.div`
background:#d8d3d3d9;
border-radius: 20px;
width: 50px;
height: 20px;
display: flex;
justify-content: center;
align-items: center;

`;
const OptionTitle=styled.div`
font-size: 1.5em;
line-height: 1.2em;
padding-bottom: 20px;
`;
const OptionTitleEdit=styled.div`
input{
font-size: 1.5em;
line-height: 1.2em;
padding-bottom: 20px;
}
`;
const Delivery=styled.div`
width: 100%;
height: auto;
position:relative;
padding-left: 10px;

`;
const OptionPrice=styled.div`
position: relative;
right:0;
font-size: 1.5em;
margin-right: 100px;
input{
  font-size: 1em;
  height: 40px;
}
`;
const GoodsDeliveryFee=styled.div`
font-size: 1em;
input{
  font-size: 1em;
}
`;

const GoodsRefund=styled.div`
font-size: 1em;
padding-bottom: 20px;
border-bottom: 1px solid rgba(136, 136, 136, 0.673);
input{
  font-size: 1em;
}
`;

const Option=styled.div`

width: 100%;
height: auto;
display: flex;
flex-direction: column;
align-items: center;

.option1 , .option2{
    width: 60%;
    height: 25px;
    background-color: #fbf3d8;
    margin: 6px;
    border-radius: 10px;
}
.sell{

    display: flex;
    justify-content: space-around;
    width: 60%;
    height   :80px ;
    margin: 0;
    .sell1-1 ,.sell1-2 {
        width: 110px;
        height:80px;
        margin: 10px;        
        border-radius: 10px;     
        background-color: #fbf3d8;
        display: flex;
        justify-content: center;
        align-items: center;

    }
}
.sell1-3{
        border-radius: 10px;
      width: 60%;
    height: 20px;
    background-color: #fbf3d8;
      display: flex;
      justify-content: center;
      align-items: center;      
}
.sell1-4{
        border-radius: 10px;
      width: 60%;
    height: 50px;
    color: white;
    background-color: #f00d33;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0;
}
`;
export const GoodsOption=({list})=>{
//댓글 추가,삭제 axios를 실행 후 reset값을 바꿔서 useEffect를 실행하여 추가 삭제된 화면을 새로 보여줌
const [reset,setReset]=useState(false);
useEffect(()=>{},[])
//삭제 버튼을 누르면 실행
const deleteGoodsDetail=()=>{
  //게시글 삭제 기능을 만듬
  const deleteGoods = async()=>{
    try {             
    const Delete = await GoodsAxiosApi.deleteGoods(list.goodsDetailId);
        }catch(error){  
    console.log(error);
   }
  }
    //게시글 삭제 기능을 실행
    deleteGoods();
  //reset값을 변경하여 댓글 업데이트 화면을 보여줌
  setReset(!reset);
}
return(
    <GoodsOptionCss>     
      <OptionCategory>{list.goodsCategory}</OptionCategory>      
        <Seller>
            <Seller1>   <Optionimage>{list.memberDto &&<img src={list.memberDto.name} ></img> }</Optionimage></Seller1>
            <Seller2><OptionNick>{list.memberDto && list.memberDto.nickName}</OptionNick>   
        <OptionTitle>{list.goodsTitle}</OptionTitle> 
        {/* <OptionTitleEdit><input type="text" value={list.goodsTitle} /></OptionTitleEdit>  */}
          </Seller2>            
        </Seller>     
        <Delivery>      
        <OptionPrice>{list.goodsPrice}</OptionPrice>  
        {/* <OptionPrice><input type="text" value={list.goodsPrice} /></OptionPrice>   */}
      
        <GoodsDeliveryFee>배송: {list.goodsDeliveryFee}</GoodsDeliveryFee>   
        {/* <GoodsDeliveryFee>배송: <input type="text" value={list.goodsDeliveryFee} /></GoodsDeliveryFee>   */}
        <GoodsRefund>배송 시작:{list.goodsRefund}</GoodsRefund>          
        {/* <GoodsRefund>배송 시작: <input type="text" value={list.goodsRefund} /></GoodsRefund>       */}

        </Delivery>
  
        <Option>
            <div className="option1"> 추가 예정</div>
            <div className="option2"> 추가 예정</div>
            <div className="sell"> 
            <div className="sell1-1"> 구매 하기</div>
            <div className="sell1-2"> 장바구니</div>
            </div>
            <div className="sell1-3"> 판매자와 채팅</div>
       
            <div className="sell1-4" onClick={()=>deleteGoodsDetail()}> 글 삭제</div>
        </Option>
        
    </GoodsOptionCss>
)
}