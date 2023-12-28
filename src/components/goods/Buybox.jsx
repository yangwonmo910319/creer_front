import { useEffect, useState } from "react";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import { CartAxiosApi } from "../../api/goods/CartAxiosApi";
import { useParams } from "react-router-dom";
import { CheckModal } from "../../utils/goods/CheckModal";
import { AnotherButton } from "../../css/common/AnotherButton";
import { ChatAxiosApi } from "../../api/chat/ChatAxiosApi";
const BuyboxCss = styled.div`
  margin-top: 50px;
  justify-content: space-around;
  display: flex;
`;

export const Buybox = ({ list, optionList, quantity1 }) => {
  const navigate = useNavigate();
  const { goodsId } = useParams(); // 이후 사용은 중괄호 불필요
  const accessToken = localStorage.getItem("accessToken");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState({});
  const [page, setPage] = useState('');

  //판매자 Pk
  const [goodsDetailId, setGoodsDetailId] = useState("");
  //판매자
  const [seller, setSeller] = useState();
  //옵션
  const [option, setOption] = useState("기본");
  //상태
  const [status, setStatus] = useState("결제 전");
  //수량
  const [quantity, setQuantity] = useState("1");
  // 상품 정보 업데이트
  useEffect(() => {
    // goodsId가 변경될 때마다 content 객체를 업데이트합니다.
    setContent({
      goodsDetailId: list.goodsDetailId, //상품 PK
      option: option, //선택 옵션
      quantity: quantity1, //수량
      title: list.goodsTitle, //상품 제목
      goodsImg: list.goodsPic, //상품 이미지
      price: list.goodsPrice,  //가격
    });
  }, [option, status, quantity1, list]);
  // 장바구니 담기
  const cartAdd = async () => {
    try {
      console.log("장바구니에 담을 content 정보 : " + JSON.stringify(content));
      const res = await CartAxiosApi.addToCart(accessToken, content);
      if (res && res.status === 200) {
        console.log("장바구니에 물품을 담았습니다.");
        console.log(res.data);
        return res.data;
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


  const purchaseClick = async () => {
    const res = await cartAdd();
    if (res) {
      navigate(`/Goods/Payment/${res}`);
    }
  };

  // 장바구니 클릭
  const cartClick = async () => {
    try {
      cartAdd();
    } catch (error) {
      console.error("상품 구매 오류 발생 : " + error);
    }
    setIsModalOpen(true);
  };

  // 채팅
  const CreateChatRoom = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await ChatAxiosApi.chatRoomCreate(accessToken, goodsId);
      navigate(`/chatting/${response.data}`);
      console.log("Buybox CreateChat response.data" + response.data);
    } catch (error) {
      console.error("BuyBox CreateChat Room 오류 발생 : " + error);
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
            onClick={purchaseClick}
          ></AnotherButton>
        ) : (
          <AnotherButton
            width={"120px"}
            height={"50px"}
            value={"재고 부족"}
            data={quantity}
          ></AnotherButton>
        )}

        <AnotherButton
          width={"120px"}
          height={"50px"}
          value={"장바구니"}
          data={quantity}
          onClick={cartClick}
        ></AnotherButton>

        <AnotherButton
          width={"120px"}
          height={"50px"}
          value={"채팅"}
          data={quantity}
          onClick={CreateChatRoom}
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
