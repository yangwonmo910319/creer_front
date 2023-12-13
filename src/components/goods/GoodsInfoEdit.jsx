import styled, { css } from "styled-components";
import { ReviewComp } from "./ReviewComp";
import { ReviewModal } from "../../utils/goods/ReviewModal";
import { useEffect, useState } from "react";
import { ReviewAxiosApi } from "../../api/goods/ReviewAxiosApi";
import { storage } from "../../api/FireBase";
const GoodsInfoCss = styled.div`
    width: 65%;
    height: auto;
    @media (max-width: 768px) {
        width: 500px;
        margin: 0 auto;
        grid-area: info; 
    }
   
`;
const ImgBox = styled.div`
    width: 100%;
    height: auto;
    display: flex;
   justify-content: center;
    .mainImg{ 
        width: 450px;
        height: auto;
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
    input{
     width: 90%;  
    }
`;
const InfoCategory = styled.div`
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
     margin: 0 10%;
     height: 30px;
     display: flex;
     justify-content: center; 
     align-items: center;  
    }
}
`;
const InfoDesc = styled.textarea`
width: 99%; 
border: none;
border-radius: 4px;
font-size: 16px;
height: 600px;
`;
const FileInput = styled.label`
  input[type="file"] {
    display: none; /* 실제 파일 선택 input을 숨김 */
  }
  /* 파일 선택 input을 대체하는 스타일을 부여할 수 있는 스타일링 */
  &::before {
    content: '파일 선택'; /* 원하는 내용으로 변경 가능 */
    display: inline-block;
    padding: 8px 12px;
    color: white;
    background-color: red;
    border-radius: 4px;
    cursor: pointer;
  }
`;
export const GoodsInfoEdit = ({ list }) => {
  const [goodsDetailId, goodsDesc, goodsPic, setGoodsDesc, setGoodsPic] = list;
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const user = localStorage.getItem("userId");
  const [url, setUrl] = useState(list[2]);
  const [newUrl, setNewUrl] = useState('');
  const [File, setFile] = useState("");
  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
  };
  const descChage = (e) => {
    setGoodsDesc(e.target.value)
  }
  const openReviewModal = () => {
    setIsReviewModalOpen(true);
  }
  useEffect(() => {
  }, []);

  const fileuploade = async () => {
    try {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(File.name);
      // 파일을 업로드하고 기다립니다.
      await fileRef.put(File);
      console.log("File uploaded successfully!");
      // 다운로드 URL을 가져오고 기다립니다.
      const url = await fileRef.getDownloadURL();
      console.log("저장경로 확인 : " + url);
      // 상태를 업데이트합니다.
      setUrl(url);
      setNewUrl(url)
    } catch (error) {
      // 에러를 처리합니다.
      console.error("Upload failed", error);
    }
  };
  const fileChage = (e) => {
    setFile(e.target.files[0]);
    fileuploade()
  };

  const reviewSubmit = async (reviewData) => {
    try {
      // 서버에 데이터 전송
      const response = await ReviewAxiosApi.insertReview(
        reviewData.rating, reviewData.reviewText, goodsDetailId, user
      );
      if (response.status === 200) {
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
  return (
    <GoodsInfoCss>
      <FileInput> <input type="file" onChange={fileChage} /></FileInput>
      <a onClick={() => { fileuploade() }}>
        <button>대표 이미지</button></a>
      <ImgBox>
        <div className="mainImg"> <img src={url} /></div>
        {/* <div className="subImg"> <img src={list[2]}/></div>         */}
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
        <InfoDesc value={goodsDesc}
          onChange={descChage} placeholder="내용"></InfoDesc>

        {/* 리뷰 출력 */}
        <ReviewComp goodsNum={list[0]}
          openReviewModal={openReviewModal}></ReviewComp>
        {/* 리뷰 작성 Madal */}
        <ReviewModal
          isOpen={isReviewModalOpen}
          onSubmit={reviewSubmit}
          closeModal={closeReviewModal}
        />
      </InfoBox>


    </GoodsInfoCss>
  )
}