import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaStar } from "react-icons/fa";
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(200px);
  }
  to {
    transform: translateY(0);
  }
`;
const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 0.3s;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  width: 50%;
  max-width: 500px;
  text-align: center;
  margin: 0 20px;
  animation: ${slideUp} 0.5s;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #333;
`;

const StarRating = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  gap: 15px;
`;

const Star = styled(FaStar)`
  font-size: 32px;
  cursor: pointer;
`;
const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 10px;
  margin-top: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  resize: none;
`;
const SubmitButton = styled.button`
  position: relative;
  display: inline-block;
  cursor: pointer;
  outline: none;
  border: 0;
  margin: 10px;
  vertical-align: middle;
  text-decoration: none;
  font-size: inherit;
  font-family: inherit;
  font-weight: 600;
  color: #382b22;
  text-transform: uppercase;
  padding: 1.25em 2em;
  background: #fffd7f;
  border: 2px solid  #ffeaa3;
  border-radius: 0.75em;
  transform-style: preserve-3d;
  transition: transform 150ms cubic-bezier(0, 0, 0.58, 1),
    background 150ms cubic-bezier(0, 0, 0.58, 1);

  &:hover {
    background:  #ffeaa3;
    transform: translate(0, 0.25em);

  }
`;

export const ReviewEditModal = ({ Writer, goodsReviewId, reviewContent, reviewStar, isOpen, onSubmit, closeModal }) => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const NickName = window.localStorage.getItem("NickName")
  const reviewTextChange = (e) => {
    setReviewText(e.target.value);
  };
  const ratingChange = (value) => {
    setRating(value);
  };

  const mouseEnter = (value) => {
    setHoverRating(value);
  };

  const mouseLeave = () => {
    setHoverRating(0);
  };

  const submitReview = () => {
    if (!reviewText.trim()) {
      // 텍스트가 비어 있는지 확인
      alert("리뷰 내용을 입력해주세요."); // 알림 표시
      return;
    }
    onSubmit({ rating, reviewText, goodsReviewId });
    closeModal();
  };
  const modalClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal(); // 모달 바깥 부분 클릭 시 모달 닫기
    }
  };
  const closeClick = () => {
    //취소 버튼 클릭시 기존 데이터 삭제 
    setReviewText('')
    setRating('')
    //Modal 닫음
    closeModal()
  }
  useEffect(() => {
    setReviewText(reviewContent)
    setRating(reviewStar)
  }, [reviewContent, reviewStar])
  return (
    <>
      {isOpen && (
        <ModalWrapper onClick={modalClick}>
          <ModalContent>
            <CloseButton onClick={closeModal}>&times;</CloseButton>
            <h2>리뷰 작성</h2>
            <div>
              <StarRating>
                {NickName === Writer ? (
                  // 작성자일 때 별점을 설정할 수 있는 부분
                  <StarRating>
                    {[1, 2, 3, 4, 5].map((value) => (
                      <Star
                        key={value}
                        onClick={() => ratingChange(value)}
                        onMouseEnter={() => mouseEnter(value)}
                        onMouseLeave={mouseLeave}
                        color={value <= (hoverRating || rating) ? "#fff453" : "gray"}
                      />
                    ))}
                  </StarRating>
                ) : (
                  // 작성자가 아닐 때는 별점을 설정할 수 없는 부분
                  <StarRating>
                    {[1, 2, 3, 4, 5].map((value) => (
                      <Star
                        key={value}
                        color={value <= (hoverRating || rating) ? "#fff453" : "gray"}
                      />
                    ))}
                  </StarRating>
                )}

              </StarRating>
            </div>
            {NickName === Writer ? (
              // 작성자일 때 TextArea를 활성화하는 부분
              <div>
                <label htmlFor="reviewText"></label>
                <TextArea
                  id="reviewText"
                  value={reviewText}
                  onChange={reviewTextChange}
                  required
                />
              </div>
            ) : (
              // 작성자가 아닐 때는 TextArea를 비활성화하는 부분
              <div>
                <label htmlFor="reviewText"></label>
                <TextArea
                  id="reviewText"
                  value={reviewText}
                  required
                />
              </div>
            )}

            {NickName === Writer ?
              <>
                <SubmitButton onClick={submitReview}>수 정</SubmitButton>
                <SubmitButton onClick={closeClick}>취 소</SubmitButton></>
              :
              <SubmitButton onClick={closeClick}>확 인</SubmitButton>}


          </ModalContent>
        </ModalWrapper>
      )}
    </>
  );
};
