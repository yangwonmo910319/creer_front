import { PurchaseModal } from "../../utils/goods/PurchaseModal";
import { CartModal } from "../../utils/goods/CartModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoodsPurchaseBlock } from "../../css/components/goods/PurchaseComp";

export const PurchaseComp = ({
  info,
  isLoggedIn,
  isInCart,
  isPurchased,
  onAddToCart,
  onPurchase,
  GoodsUrl,
}) => {
  const { title, author, publisher, price, description, imageUrl } = info;
  const navigate = useNavigate();
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);

  const openCartModal = () => {
    setCartModalOpen(true);
  };

  const closeCartModal = () => {
    setCartModalOpen(false);
  };

  const openPurchaseModal = () => {
    setPurchaseModalOpen(true);
  };

  const closePurchaseModal = () => {
    setPurchaseModalOpen(false);
  };

  const addToCart = () => {
    openCartModal();
  };

  const purchaseGoods = () => {
    openPurchaseModal();
  };

  const goToViewerPage = () => {
    navigate("/viewerpage", { state: { contentUrl: GoodsUrl } });
  };

  return (
    <GoodsPurchaseBlock>
      <div className="contents">
        <h2>책 정보</h2>
        <div className="coverimg">
          {imageUrl && <img src={imageUrl} alt="CoverImage" />}
        </div>
        <div className="info">
          <h3>{title}</h3>
          <p>저자: {author}</p>
          <p>출판사: {publisher}</p>
          <p>가격: {price} 원</p>
          <p>{description}</p>
          <div className="buttons">
            {isPurchased ? (
              <button onClick={goToViewerPage}>뷰어 열기</button>
            ) : (
              <>
                {isLoggedIn ? (
                  <>
                    <button onClick={addToCart}>
                      {isInCart ? "장바구니에서 제거" : "장바구니에 담기"}
                    </button>
                    <button onClick={purchaseGoods}>구매하기</button>
                  </>
                ) : (
                  <button>로그인이 필요합니다</button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <CartModal
        isOpen={cartModalOpen}
        closeModal={closeCartModal}
        onConfirm={() => {
          onAddToCart();
          closeCartModal();
        }}
        action={isInCart ? "remove" : "add"}
      />
      <PurchaseModal
        isOpen={purchaseModalOpen}
        closeModal={closePurchaseModal}
        onConfirm={() => {
          onPurchase();
          closePurchaseModal();
        }}
        action="purchase"
      />
    </GoodsPurchaseBlock>
  );
};
