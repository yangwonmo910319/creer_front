import React, { useEffect, useState } from "react";
import styled from "styled-components";
import cartImg from "../../images/cart.png";
import { GoodsAxiosApi } from "../../api/goods/GoodsAxiosApi";
import { CartAxiosApi } from "../../api/goods/CartAxiosApi";
import { MiddleOrderBox } from "../../css/common/MiddleOrderBox";
import { StyledButton } from "../../css/common/StyledButton";
import { StyledTitle } from "../../css/common/StyledTitle";

const CartPageContainer = styled.div`
  margin: 20px;
  width: 60vw;
`;

const GoodsCard = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px 0;
  display: flex;
  align-items: center;

  .goods-image {
    width: 150px;
    height: 200px;
    margin-right: 10px;
  }

  .goods-title {
    font-weight: bold;
    margin-right: 10px;
  }

  .goods-info {
    flex: 1;
  }

  .remove-button {
    background-color: red;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
  }
`;

export const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const accessToken = localStorage.getItem("accessToken");

  // 장바구니 업데이트
  const fetchCartItems = async () => {
    const response = await CartAxiosApi.getCartItems(accessToken);
    console.log("장바구니 업데이트 응답 : " + response.data);
  };

  useEffect(() => {
    if (accessToken) {
      fetchCartItems();
    }
  }, [accessToken]);

  useEffect(() => {
    console.log("상태 업데이트 후의 cartItems : " + cartItems); // 상태 업데이트 후의 장바구니 항목 출력
  }, [cartItems]);

  // 장바구니 선택 구매
  const checkboxChange = (goodsId) => {
    if (checkedItems.includes(goodsId)) {
      setCheckedItems(checkedItems.filter((id) => id !== goodsId));
    } else {
      setCheckedItems([...checkedItems, goodsId]);
    }
    console.log(goodsId);
  };

  const isChecked = (goodsId) => checkedItems.includes(goodsId);
  const purchaseSelected = async () => {
    try {
      const response = await GoodsAxiosApi.purchaseGoods(
        // member.id,
        checkedItems
      );
      console.log(checkedItems);
      console.log(response); // 서버로부터의 응답 출력
      if (response.status === 200 && response.data) {
        if (window.confirm("선택된 책들을 구매하시겠습니까?")) {
          fetchCartItems(); // 책을 구매한 후 장바구니 아이템 목록을 다시 불러옴
          setCheckedItems([]); // 체크된 아이템 초기화
        }
      } else {
        alert("잔액이 부족합니다.");
      }
    } catch (error) {
      console.error("장바구니 선택 구매 오류 : " + error);
    }
  };

  // 장바구니에서 제거
  const removeFromCart = async (goodsId) => {
    try {
      const response = await CartAxiosApi.removeFromCart(accessToken, goodsId);
      console.log(response); // 서버로부터의 응답 출력
      if (response.status === 200) {
        if (window.confirm("장바구니에서 해당 책을 삭제하시겠습니까?")) {
          fetchCartItems(); // 장바구니 아이템 제거 후 장바구니 아이템 목록을 다시 불러옴
        }
      } else {
        console.error("장바구니 아이템 목록 가져오기 실패");
      }
    } catch (error) {
      console.error("에러 확인", error);
    }
  };

  return (
    <>
      <MiddleOrderBox>
        <CartPageContainer>
          <StyledTitle>
            <img src={cartImg} alt="장바구니" style={{ width: "4vw" }}></img>
            &nbsp;장바구니
          </StyledTitle>
          {cartItems.map((item) => (
            <GoodsCard key={item.goodsId}>
              <input
                type="checkbox"
                checked={isChecked(item.goodsId)}
                onChange={() => checkboxChange(item.goodsId)}
                style={{ margin: "20px", transform: "scale(2)" }}
              />
              <img
                className="goods-image"
                src={item.goodsInfo.imageUrl}
                alt="책 표지 이미지"
                style={{
                  transform: "rotate(5deg)", // 이미지를 약간 기울임
                  boxShadow: "2px 2px 1px 0px rgba(0,0,0,0.75)", // 그림자 효과 추가
                  borderRadius: "5%", // 둥근 테두리 적용
                  border: "none", // 테두리 보이지 않게 설정
                }}
              />

              <div className="goods-info">
                <p className="goods-title">{item.goodsInfo.title}</p>
                <p className="goods-author">{item.goodsInfo.author}</p>
                <p className="goods-price">{item.goodsInfo.price}원</p>
              </div>
              <button
                className="remove-button"
                onClick={() => removeFromCart(item.goodsId)}
              >
                제거
              </button>
            </GoodsCard>
          ))}
          <MiddleOrderBox>
            <StyledButton
              onClick={purchaseSelected}
              value="선택 구매하기"
              width="200px"
              height="50px"
            ></StyledButton>
          </MiddleOrderBox>
          {/* <button onClick={purchaseAll}>모두 구매</button> */}
        </CartPageContainer>
      </MiddleOrderBox>
    </>
  );
};
