import React, { useEffect, useState } from "react";
import styled from "styled-components";
import cartImg from "../../images/cart.png";
import { GoodsAxiosApi } from "../../api/goods/GoodsAxiosApi";
import { CartAxiosApi } from "../../api/goods/CartAxiosApi";
import { MiddleOrderBox } from "../../css/common/MiddleOrderBox";
import { StyledTitle } from "../../css/common/StyledTitle";
import { AnotherButton } from "../../css/common/AnotherButton";
import { useNavigate } from "react-router-dom";

const CartPageContainer = styled.div`
  margin: 20px;
  width: 80%;
  max-width: 1280px;

`;

const GoodsCard = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100px;
  .goodsInfo {
    display: flex;
    width: 100%;
  .goodsImage {
    width: 100px;
    height: 100px;
    margin-right: 10px;
  }
  .removeButton {

    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
  } 
  div{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .title {
    width: calc(100% - (150px + 5% + 10% + 5%));
    height: 200px;
    margin-right: 10px;
  }
.quantity{
      flex: none;
    min-width: 30px;
    width: 5%;
}
  .btn{
    flex: none;
    min-width: 50px;
    width: 5%;
  }
  .price{
    flex: none;
    min-width: 50px;
    width: 10%;
  }
  }
  
`;

export const Cart = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState('');
  const [checkedItems, setCheckedItems] = useState([]);
  const accessToken = localStorage.getItem("accessToken");

  const fetchCartItems = async () => {
    try {
      const response = await CartAxiosApi.getCartItems(accessToken);
      // console.log("장바구니 목록 : " + JSON.stringify(response));

      if (response.status === 200) {
        setCartItems(response.data);
        console.log("cartItems : " + JSON.stringify(response));
       console.log(response.data);
       console.log(response.data);
       console.log(response.data);
       console.log(response.data);
       console.log(response.data);
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

  const remove = async (num) => {
    try {
      const response = await CartAxiosApi.removeFromCart(accessToken, num);
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

  const move = (e) => {
    navigate(`/goods/` + e)
  }
  return (
    <>
      <MiddleOrderBox>
        <CartPageContainer>
          <StyledTitle>
            <img src={cartImg} alt="장바구니" style={{ width: "80px" }}></img>
            장바구니
          </StyledTitle>
          {cartItems && cartItems.map((item, i) => (
            <GoodsCard key={i}>
              <div className="goodsInfo" >
                {/* 정보 추가 */}
                <div onClick={() => { move(item.goodsDetailId) }}>
                  <img src={item.goodsImg} alt={item.title} className="goodsImage" />
                  <div className="title" >{item.title}{item.option}</div>
                  <div className="price">{item.price}원</div>
                  <div className="quantity">{item.quantity}개</div>           
                  <div className="price">{item.quantity*item.price}원</div>
                  </div>
                <div className="btn">
                  <AnotherButton
                    onClick={() => { remove(item.cartId) }}
                    value="삭제"
                    width="50px"
                    height="50px">
                  </AnotherButton>
                </div>
              </div>
            </GoodsCard>
          ))}
          <br />
          {/* <GoodsCard >
              <div className="goodsInfo" >
        
                <div>             
                  <div className="title" ></div>
                  <div className="price">원</div>
                  <div className="quantity">개</div>           
                  <div className="price">원</div>
                  </div>
                <div className="btn">       
                </div>
              </div>
            </GoodsCard> */}
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
