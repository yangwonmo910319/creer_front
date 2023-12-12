import styled, { css } from "styled-components";
import { ReviewComp } from "../../components/goods/ReviewComp";
import { ReviewModal } from "../../utils/goods/ReviewModal";
import { useState } from "react";
import { ReviewAxiosApi } from "../../api/goods/ReviewAxiosApi";
const GoodsInfoCss=styled.div`
    width: 65%;
    height: auto;
    border: 3px solid blue;
    @media (max-width: 768px) {
        width: 500px;
        margin: 0 auto;
        grid-area: info; 
    }
   
`;
const ImgBox = styled.div`
    width: 100%;
    height: auto;
    border:  3px solid green;
    display: flex;
   justify-content: center;
    .mainImg{ 
        width: 450px;
        height: auto;
        border:  3px solid red;
        display: flex;
        justify-content: center;
        img{
        width: 400px;
        height: 400px;
    }
    }
    .subImg{
        width: 100px;
        height: auto;
        border:  3px solid red;
        img{
        width: 80px;
        height: 80px;
    }
    }
`;
const InfoBox = styled.div`
     
       width: 80%;
    height: auto;
    border:  1px solid black;
    margin: 20px auto;
     p{ margin: 0 auto;
         width: 400px;
        text-align: center;
     
    }
`;
const InfoCategory= styled.div`
 margin: 0 auto;
width: 80%;
height: 30px;
margin-top: 50px;
 display: flex;
 justify-content: space-around;
 border:  1px solid rgba(0, 0, 0, 0.192);
 border-left: none;
 border-right: none;
 font-family:Arial;
ul{  
  display: flex;
    li{  
     width: 150px;
     margin: 0 30px;
     height: 30px;

     display: flex;
     justify-content: center; 
     align-items: center;  


    }
}
`;

export const GoodsInfo=({list})=>{
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const user = localStorage.getItem("userId");
    const closeReviewModal = () => {
        setIsReviewModalOpen(false);
      };   

   const openReviewModal = () =>{

    setIsReviewModalOpen(true);
   }

    const reviewSubmit = async (reviewData) => {

        try {
          // 서버에 데이터 전송
          const response = await ReviewAxiosApi.insertReview(      
            reviewData.rating, reviewData.reviewText,list[0],user
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
    <GoodsInfoCss>     
          <ImgBox> 
          <div className="mainImg"> <img src={list[1]}/></div>
          <div className="subImg"> <img src={list[2]}/></div>        
          </ImgBox>
          <InfoCategory>
            <ul>
                <li>소개</li>
                <li>댓글</li>
                <li>판매자</li>
      
            </ul>
          </InfoCategory>
        <InfoBox>  
            {/* 상품 정보 표시 */}
            <p style={{marginTop:"50px"}}> {list[1]} </p>  
            {/* 리뷰 출력 */}
           <ReviewComp goodsNum={list[0]}      
             openReviewModal={openReviewModal}></ReviewComp>
            {/* 리뷰 Madal */}
            <ReviewModal
          isOpen={isReviewModalOpen}
          onSubmit={reviewSubmit}
          closeModal={closeReviewModal}
        />
        </InfoBox>
 
   
    </GoodsInfoCss>
)
}