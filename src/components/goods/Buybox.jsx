import { useEffect, useState } from "react";
import styled from "styled-components";
import { PurchaseAxiosApi } from "../../api/goods/PurchaseAxiosApi";
import { useNavigate } from "react-router-dom";
import { CartAxiosApi } from "../../api/goods/CartAxiosApi";
import { useParams } from "react-router-dom";

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
  const navigate = useNavigate();
  const { goodsId } = useParams(); // 이후 사용은 중괄호 불필요
  const accessToken = localStorage.getItem("accessToken");

  //판매자 Pk
  const [goodsDetailId, setGoodsDetailId] = useState("");
  //판매자
  const [seller, setSeller] = useState("");
  //옵션
  const [option, setOption] = useState("");
  //상태
  const [status, setStatus] = useState("결제 전");
  //수량
  const [quantity, setQuantity] = useState("1");

  const submit = () => {
    SelectGoodsLIst();
  };

  // 장바구니 담기
  const goToCart = async () => {
    try {
      await CartAxiosApi.addToCart(accessToken, goodsId);
      alert("장바구니에 물품을 성공적으로 담았습니다.");
    } catch (error) {
      console.error("장바구니에 물품을 담는데 실패했습니다.", error);
      alert("장바구니에 물품을 담는데 실패했습니다.");
    }
  };

  useEffect(() => {
    if (list !== null && optionList !== null && quantity1 !== null) {
      const goodsOptionContentArray = optionList.map(
        (obj) => obj.goodsOptionContent
      );
      const result = goodsOptionContentArray.join(", ");
      setOption(result);
      if (list.memberDto !== undefined) {
        setSeller(list.memberDto.id);
      } else {
        console.log("memberDto is undefined");
      }
      setGoodsDetailId(list.goodsDetailId);
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
      };
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
      <Btn1 onClick={submit}>구매</Btn1>
      <Btn1 onClick={goToCart}>장바구니</Btn1>
      <Btn1>채팅</Btn1>
    </BuyboxCss>
  );
};
