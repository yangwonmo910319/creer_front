import { useEffect, useState } from "react";
import styled from "styled-components";
import { PurchaseAxiosApi } from "../../api/goods/PurchaseAxiosApi";
import { useNavigate } from "react-router-dom";
import { CartAxiosApi } from "../../api/goods/CartAxiosApi";
import { useParams } from "react-router-dom";
import { CheckModal } from "../../utils/goods/CheckModal";
import { AnotherButton } from "../../css/common/AnotherButton";
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
  color: #616161;
  background: #c0f4eb;
  border: 1px solid #1f968e;
`;

export const Buybox = ({ list, optionList, quantity1 }) => {
  const navigate = useNavigate();
  const { goodsId } = useParams(); // 이후 사용은 중괄호 불필요
  const accessToken = localStorage.getItem("accessToken");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState({});
  //판매자 Pk
  const [goodsDetailId, setGoodsDetailId] = useState("");
  //판매자
  const [seller, setSeller] = useState();
  //옵션
  const [option, setOption] = useState("");
  //상태
  const [status, setStatus] = useState("결제 전");
  //수량
  const [quantity, setQuantity] = useState("1");

  // 상품 정보 업데이트
  useEffect(() => {
    // goodsId가 변경될 때마다 content 객체를 업데이트합니다.
    setContent({
      goodsDetailId: list.goodsDetailId,
      option: option,
      quantity: quantity1,
      status: status,
    });
  }, [seller, goodsId, option, quantity, status, content.seller, quantity1]);

  // 장바구니 담기
  const cartAdd = async () => {
    try {
      console.log("장바구니에 담을 content 정보 : " + JSON.stringify(content));
      const res = await CartAxiosApi.addToCart(accessToken, content);
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

  // 구매
  const SelectGoodsList = async () => {
    try {
      console.log("구매 content 정보 : " + JSON.stringify(content));
      const rsp = await PurchaseAxiosApi.insertPurchase(content);
      console.log("구매한 상품 상세정보 : " + rsp.data);
    } catch (error) {
      console.log("상품 구매 오류 발생 : " + error);
    }
  };

  return (
    <>
      <BuyboxCss>
        {list.goodsStock >= quantity1 ? (
          <AnotherButton
            width={"120px"}
            height={"50px"}
            value={"구매"}
            data={quantity}
            onClick={SelectGoodsList}
          ></AnotherButton>
        ) : (
          <AnotherButton
            width={"120px"}
            height={"50px"}
            value={"재고 부족"}
            data={quantity}
          ></AnotherButton>
        )}
        {/* <Btn1 onClick={cartAdd}>장바구니</Btn1> */}
        <AnotherButton
          width={"120px"}
          height={"50px"}
          value={"장바구니"}
          data={quantity}
          onClick={cartAdd}
        ></AnotherButton>
        <AnotherButton
          width={"120px"}
          height={"50px"}
          value={"채팅"}
          data={quantity}
        ></AnotherButton>
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
