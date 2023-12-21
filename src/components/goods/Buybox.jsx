import { useEffect, useState } from "react";
import styled from "styled-components";
import { PurchaseAxiosApi } from "../../api/goods/PurchaseAxiosApi";
import { useNavigate } from "react-router-dom";
import { CartAxiosApi } from "../../api/goods/CartAxiosApi";
import { useParams } from "react-router-dom";
import { CheckModal } from "../../utils/goods/CheckModal";

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
  color: white;
  background: #e3141b;  
  border: 2px solid #412525;  

`;

export const Buybox = ({ list, optionList, quantity1 }) => {
  console.log("list")
  console.log(list)
  console.log("list")
  const navigate = useNavigate();
  const { goodsId } = useParams(); // 이후 사용은 중괄호 불필요
  const accessToken = localStorage.getItem("accessToken");
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  const cartAdd = async () => {
    try {
      const res = await CartAxiosApi.addToCart(accessToken, goodsId);
      if (res && res.status === 200) {
        alert("장바구니에 물품을 담았습니다.");
        setIsModalOpen(true);
      } else {
        console.error("장바구니에 물품을 담는데 실패했습니다.", res);
        alert("장바구니에 물품을 담는데 실패했습니다.");
      }
    } catch (error) {
      // 오류가 발생한 경우
      console.error("장바구니에 물품을 담는데 실패했습니다.", error);
      alert("장바구니에 물품을 담는데 실패했습니다.");
    }
  };

  // 장바구니 페이지로 이동
  const goToCart = () => {
    navigate("/Cart");
  };

  // 모달 닫기
  const setIsCheckModalOpen = (isOpen) => {
    setIsModalOpen(isOpen);
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

  const SelectGoodsLIst = async () => {
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
    <>
      <BuyboxCss>
        <Btn1 onClick={submit}>구매</Btn1>
        <Btn1 onClick={cartAdd}>장바구니</Btn1>
        <Btn1>채팅</Btn1>
      </BuyboxCss>

      <CheckModal
        isOpen={isModalOpen}
        onSubmit={goToCart}
        checkMmessage={"장바구니 페이지로 이동하시겠습니까?"}
        setIsCheckModalOpen={setIsCheckModalOpen}
      />
    </>
  );
};
