import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PurchaseComp } from "../../components/goods/PurchaseComp";
import { ReviewComp } from "../../components/goods/ReviewComp";
import { useUser } from "../../contexts/Context";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ReviewModal } from "../../utils/goods/ReviewModal";
import { CartAxiosApi } from "../../api/goods/CartAxiosApi";
import { GoodsAxiosApi } from "../../api/goods/GoodsAxiosApi";
import { ReviewAxiosApi } from "../../api/goods/ReviewAxiosApi";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  max-width: 1200px;
  margin-top: 2rem;
  @media (max-width: 960px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ReviewSectionContainer = styled.div`
  flex: 1;
`;

const GoodsPurchaseBlock = styled.div`
  flex: 1;
`;

export const BuyReview = () => {
  const location = useLocation();
  const GoodsId = location.state.GoodsId;
  const [GoodsUrl, setGoodsUrl] = useState(""); // 뷰어 열기를 위한 상태 저장
  console.log("GoodsId = " + GoodsId);

  const selectedGoods = async () => {
    try {
      const response = await GoodsAxiosApi.findGoodsById(GoodsId);
      // console.log("책 링크: " + response.data.contentUrl);
      setGoodsUrl(response.data.contentUrl); // 상태에 책 URL 저장
    } catch (error) {
      console.error("책 정보를 가져오는데 실패했습니다:", error);
    }
  };

  selectedGoods();

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]); // 리뷰 데이터를 관리하는 상태
  const { isLoggedin, checkLoginStatus, user } = useUser();
  const [GoodsInfo, setGoodsInfo] = useState(null);
  const [isInCart, setIsInCart] = useState(false);
  // 책이 구매되었는지 상태 관리
  const [isPurchased, setIsPurchased] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    checkLoginStatus();
  }, [isLoggedin]);
  useEffect(() => {
    fetchGoodsInfo();
  }, []);
  useEffect(() => {
    if (user && GoodsInfo) {
      checkIfGoodsInCart();
      checkIfGoodsPurchased();
    }
  }, [user, GoodsInfo]);
  const openReviewModal = () => {
    if (isLoggedin) {
      // 로그인 상태 확인
      setIsReviewModalOpen(true); // 로그인 상태라면 리뷰 모달 창 열기
    } else {
      // 로그인 상태가 아니라면 로그인 페이지로 이동
      alert("로그인이 필요합니다.");
      // navigate("/login");
    }
  };

  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
  };

  const reviewSubmit = async (reviewData) => {
    try {
      // 서버에 데이터 전송
      const response = await ReviewAxiosApi.reviewData(
        user.id, // 현재 사용자의 ID
        GoodsInfo.id, // 현재 책의 ID
        reviewData.reviewText,
        reviewData.rating
      );

      if (response.status === 201 || response.status === 200) {
        // 성공적으로 데이터가 전송되었으면, 리뷰 목록에 새 리뷰 추가
        setReviews([...reviews, reviewData]);
        closeReviewModal();
        window.location.reload();
      } else {
        // 서버에서 응답이 오지 않거나, 응답의 상태 코드가 200이 아닌 경우 에러 처리
        console.error("서버 응답 실패");
      }
    } catch (error) {
      // 네트워크 요청 중에 오류가 발생한 경우 에러 처리
      console.error("submit review 데이터에러 :", error);
    }
  };

  const fetchGoodsInfo = async () => {
    try {
      const response = await GoodsAxiosApi.getGoodsInfo(GoodsId); // 클릭한 Goods.id
      if (response.status === 200) {
        if (response.data !== null) {
          setGoodsInfo(response.data);
          console.log(response.data);
        } else {
          // console.error("요청은 성공했지만, 반환된 책 정보가 null입니다.");
        }
      } else {
        // console.error(
        //   `책 정보를 가져오는 요청이 실패했습니다. 상태 코드: ${response.status}`
        // );
      }
    } catch (error) {
      // console.error("책 정보를 가져오는 도중 에러가 발생했습니다:", error);
    }
  };

  // 장바구니에 해당 책이 있는지 확인하는 함수
  const checkIfGoodsInCart = async () => {
    try {
      const response = await CartAxiosApi.getCartItems(user.id);
      if (response.status === 200) {
        setIsInCart(
          response.data.some((item) => item.GoodsId === GoodsInfo.id)
        );
      } else {
        console.error("장바구니 아이템 목록 가져오기 실패");
      }
    } catch (error) {
      console.error("장바구니 아이템 확인 중 에러 발생", error);
    }
  };

  const addToCart = async () => {
    if (user) {
      if (isInCart) {
        try {
          const response = await CartAxiosApi.removeFromCart(
            user.id,
            GoodsInfo.id
          );
          if (response.status === 200) {
            setIsInCart(false);
            alert("장바구니에서 제거되었습니다.");
          } else {
            console.error("장바구니에서 제거 실패");
          }
        } catch (error) {
          console.error("장바구니에서 제거 중 에러 발생", error);
        }
      } else {
        try {
          const response = await CartAxiosApi.addToCart(user.id, GoodsInfo.id);
          if (response.status === 200) {
            setIsInCart(true);
            alert("장바구니에 추가되었습니다.");
            navigate("/CartPage");
          } else {
            console.error("장바구니에 추가 실패");
          }
        } catch (error) {
          console.error("장바구니에 추가 중 에러 발생", error);
        }
      }
    } else {
      alert("로그인이 필요합니다.");
    }
  };
  // 사용자가 책을 구매했는지 확인하는 기능을 추가합니다.
  const checkIfGoodsPurchased = async () => {
    try {
      if (user) {
        const response = await GoodsAxiosApi.isGoodsBought(
          user.id,
          GoodsInfo.id
        );
        if (response.status === 200) {
          setIsPurchased(response.data);
        } else {
          console.error("구매 확인 실패");
        }
      }
    } catch (error) {
      console.error("구매 확인 중 에러 발생", error);
    }
  };
  // 책 구매 함수
  const purchaseGoods = async () => {
    if (user.cash >= GoodsInfo.price && user) {
      try {
        const response = await GoodsAxiosApi.purchaseGoods(
          user.id,
          GoodsInfo.id
        );
        if (response.status === 200) {
          alert("구매가 완료되었습니다.");
          checkIfGoodsPurchased(); // 구매 후 구매 상태를 다시 확인합니다.
        } else {
          console.error("구매 실패");
        }
      } catch (error) {
        console.error("구매 중 에러 발생", error);
      }
    } else {
      alert("잔액이 부족합니다.");
    }
  };

  return (
    <>
      <Container>
        {GoodsInfo && (
          <ContentWrapper>
            <GoodsPurchaseBlock>
              <PurchaseComp
                info={GoodsInfo}
                isLoggedIn={isLoggedin}
                isInCart={isInCart}
                isPurchased={isPurchased}
                onAddToCart={addToCart}
                onPurchase={purchaseGoods}
                GoodsUrl={GoodsUrl} // ContentUrl를 props로 전달
              />
            </GoodsPurchaseBlock>
            <ReviewSectionContainer>
              <ReviewComp
                openReviewModal={openReviewModal}
                GoodsInfo={GoodsInfo}
              />
            </ReviewSectionContainer>
          </ContentWrapper>
        )}

        <ReviewModal
          isOpen={isReviewModalOpen}
          onSubmit={reviewSubmit}
          closeModal={closeReviewModal}
        />
      </Container>
    </>
  );
};
