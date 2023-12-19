import { useEffect, useState } from "react";
import styled from "styled-components";
import { PurchaseAxiosApi } from "../../api/goods/PurchaseAxiosApi";







const BuyboxCss = styled.div`
margin-top: 50px;
 justify-content: space-around;
display: flex;
`;
const Btn1 = styled.div`
    width: 100px;
    height: 45px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fcd3d3;
`;



export const Buybox = ({ list, optionList, quantity1 }) => {
  //판매자 Pk
  const [goodsDetailId, setGoodsDetailId] = useState('')
  //판매자
  const [seller, setSeller] = useState('');
  //옵션
  const [option, setOption] = useState('')
  //상태
  const [status, setStatus] = useState('결제 전')
  //수량
  const [quantity, setQuantity] = useState('1')


  const submit = () => {

    SelectGoodsLIst()

  }
  useEffect(() => {
    if (list !== null && optionList !== null && quantity1 !== null) {
      const goodsOptionContentArray = optionList.map(obj => obj.goodsOptionContent);
      const result = goodsOptionContentArray.join(", ");
      setOption(result);
      if (list.memberDto !== undefined) {
        setSeller(list.memberDto.id)
      } else {
        console.log("memberDto is undefined");
      }
      setGoodsDetailId(list.goodsDetailId)
    }
  }, [optionList]);

  const SelectGoodsLIst = async (content) => {
    try {
      const content = {
        seller: seller,
        goodsDetailId: goodsDetailId,
        option: option,
        quantity: quantity,
        status: status,
      }
      const rsp = await PurchaseAxiosApi.insertPurchase(content);
      // 상품 정보를 가져옵니다.
      console.log("상품 상세정보");
      console.log(rsp.data);
      //가져온 데이터를 저장     
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <BuyboxCss>
      <Btn1 onClick={submit}>    구매하기</Btn1>
      <Btn1 onClick={submit}>    장바구니</Btn1>
      <Btn1 onClick={submit}>    판매자와<br></br> 채팅</Btn1>
    </BuyboxCss>
  )
}