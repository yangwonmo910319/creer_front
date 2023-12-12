import { ReviewComp } from "../../components/goods/ReviewComp";
import { ReviewModal } from "../../utils/goods/ReviewModal";
import { ReviewEditModal } from "../../utils/goods/ReviewEditModal";
import { useState } from "react";
import { ReviewAxiosApi } from "../../api/goods/ReviewAxiosApi";



export const ReviewBox=({goodsDetailId})=>{
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [isReviewEidtModalOpen, setReviewEidtModalOpen] = useState(false);
    const user = localStorage.getItem("userId");
    const closeReviewModal = () => {
        setIsReviewModalOpen(false);
    }; 
    const openReviewModal = () =>{
    setIsReviewModalOpen(true);
   }
   const closeReviewEidtModal = () => {
    setReviewEidtModalOpen(false);
}; 
const openReviewEidtModal = () =>{
  setReviewEidtModalOpen(true);
}
//리뷰 추가
    const reviewSubmit = async (reviewData) => {

      alert(reviewData.rating)
        try {
          // 서버에 데이터 전송
          const response = await ReviewAxiosApi.insertReview(      
            reviewData.rating, reviewData.reviewText,reviewData,user
          );    
          if (response.status === 201) {
            // 성공적으로 데이터가 전송되었으면, 리뷰 목록에 새 리뷰 추가    
            closeReviewModal();
          } else {
            // 서버에서 응답이 오지 않거나, 응답의 상태 코드가 200이 아닌 경우 에러 처리
            console.error("서버 응답 실패");
          }
        } catch (error) {
          // 네트워크 요청 중에 오류가 발생한 경우 에러 처리
          console.error("submit review 데이터에러 :", error);
        }
      };
      //리뷰 수정
    const reviewEidtSubmit = async (reviewData) => {

      try {
        // 서버에 데이터 전송
        const response = await ReviewAxiosApi.insertReview(      
          reviewData.rating, reviewData.reviewText,reviewData,user
        );    
        if (response.status === 201) {
          // 성공적으로 데이터가 전송되었으면, 리뷰 목록에 새 리뷰 추가    
          closeReviewModal();
        } else {
          // 서버에서 응답이 오지 않거나, 응답의 상태 코드가 200이 아닌 경우 에러 처리
          console.error("서버 응답 실패");
        }
      } catch (error) {
        // 네트워크 요청 중에 오류가 발생한 경우 에러 처리
        console.error("submit review 데이터에러 :", error);
      }
    };
return(
    <>
         <ReviewComp goodsNum={goodsDetailId} openReviewModal={openReviewModal}  openReviewEditModal={openReviewEidtModal}></ReviewComp>
{/* 리뷰 작성 Madal */}
 <ReviewModal
isOpen={isReviewModalOpen}
onSubmit={reviewSubmit}
closeModal={closeReviewModal}
/>
{/* 리뷰 수정 Madal */}
<ReviewEditModal

isOpen={isReviewEidtModalOpen}
onSubmit={reviewEidtSubmit}
closeModal={closeReviewEidtModal}
/>
    </>
)

}