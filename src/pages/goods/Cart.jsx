import React, { useEffect, useState } from "react";
import styled from "styled-components";
import cartImg from "../../images/cart.png";
import { GoodsAxiosApi } from "../../api/goods/GoodsAxiosApi";
import { CartAxiosApi } from "../../api/goods/CartAxiosApi";
import { MiddleOrderBox } from "../../css/common/MiddleOrderBox";
import { StyledTitle } from "../../css/common/StyledTitle";
import { AnotherButton } from "../../css/common/AnotherButton";

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

  .goodsImage {
    width: 150px;
    height: 200px;
    margin-right: 10px;
  }

  .goodsTitle {
    font-weight: bold;
    margin-right: 10px;
  }

  .goodsInfo {
    flex: 1;
  }

  .removeButton {
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

  const fetchCartItems = async () => {
    try {
      const response = await CartAxiosApi.getCartItems(accessToken);
      // console.log("장바구니 목록 : " + JSON.stringify(response));

      if (response.status === 200) {
        setCartItems(response.data);
        console.log("cartItems : " + JSON.stringify(response));
      } else {
        console.error("장바구니 가져오기 실패");
      }
    } catch (error) {
      console.error("장바구니 목록을 가져오는 중 오류 발생", error);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchCartItems();
    }
  }, [accessToken]);

  const checkboxChange = (goodsId) => {
    if (checkedItems.includes(goodsId)) {
      setCheckedItems(checkedItems.filter((id) => id !== goodsId));
    } else {
      setCheckedItems([...checkedItems, goodsId]);
    }
  };

  const isChecked = (goodsId) => checkedItems.includes(goodsId);

  const purchaseSelected = async () => {
    try {
      const response = await GoodsAxiosApi.purchaseGoods(checkedItems);
      console.log(response);

      if (response.status === 200 && response.data) {
        if (window.confirm("선택된 책들을 구매하시겠습니까?")) {
          fetchCartItems();
          setCheckedItems([]);
        }
      } else {
        alert("잔액이 부족합니다.");
      }
    } catch (error) {
      console.error("장바구니 선택 구매 오류:", error);
    }
  };

  const removeFromCart = async (goodsId) => {
    try {
      const response = await CartAxiosApi.removeFromCart(accessToken, goodsId);

      if (response.status === 200) {
        if (window.confirm("장바구니에서 해당 책을 삭제하시겠습니까?")) {
          fetchCartItems();
        }
      } else {
        console.error("장바구니 아이템 목록 가져오기 실패");
      }
    } catch (error) {
      console.error("에러 확인:", error);
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
            <GoodsCard key={item.goodsDetailId}>
              <div className="goodsInfo">
                {/* 정보 추가 */}
                <input
                  type="checkbox"
                  checked={isChecked(item.goodsDetailId)}
                  onChange={() => checkboxChange(item.goodsDetailId)}
                />
                <img src={item.image} alt={item.title} className="goodsImage" />
                <div className="goodsTitle">{item.seller}</div>
                <div className="goodsTitle">{item.option}</div>
                <div className="goodsTitle">{item.quantity}</div>
              </div>
              <button
                className="removeButton"
                onClick={() => removeFromCart(item.goodsDetailId)}
              >
                제거
              </button>
            </GoodsCard>
          ))}

          <br />

          <MiddleOrderBox>
            <AnotherButton
              onClick={purchaseSelected}
              value="구매하기"
              width="200px"
              height="50px"
            ></AnotherButton>
          </MiddleOrderBox>

          <br />
        </CartPageContainer>
      </MiddleOrderBox>
    </>
  );
};
