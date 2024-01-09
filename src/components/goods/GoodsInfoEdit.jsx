import { useEffect, useState } from "react";
import { ReviewAxiosApi } from "../../api/goods/ReviewAxiosApi";
import { storage } from "../../api/FireBase";
import { GoodsAxiosApi } from "../../api/goods/GoodsAxiosApi";
import { SelectImg } from "./SelectImg";
import { PictureAxiosApi } from "../../api/goods/PictureAxiosApi";
import * as DOMPurify from 'dompurify';
import { QuillText } from "./QuillText";
import { GoodsInfoCss, UploadLabel, UploadInput, UploadContainer, NewImgBox, ImgCategory, ImgBox, InfoBox, InfoDescCss, InfoCategory } from "../../css/components/goods/GoodsInfoEdit";
export const GoodsInfoEdit = ({ list, reply, member }) => {

  const [goodsDetailId, goodsDesc, goodsPic, setGoodsDesc, setGoodsPic] = list;

  //Modal Switch
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  //작성자와 로그인 유저 확인용
  const user = localStorage.getItem("userId");
  //상품 대표 이미지
  const [url, setUrl] = useState(list[2]);
  //상품 대표 이미지
  const [mainurl, setMainUrl] = useState(list[2]);
  //상품 대표 이미지 변경시 사용
  const [newUrl, setNewUrl] = useState('');
  //리뷰 모달 닫기
  const closeReviewModal = () => {
    setIsReviewModalOpen(false);

  };

  //파이어베이스 이미지 주소 받기
  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];
    try {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(selectedFile.name);
      await fileRef.put(selectedFile);
      console.log("File uploaded successfully!");
      const url = await fileRef.getDownloadURL();
      console.log("저장경로 확인 : " + url);
      setNewUrl(url);
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  //리뷰 추가
  const reviewSubmit = async ({ rating, reviewText, url }) => {
    try {
      // 서버에 데이터 전송
      const response = await ReviewAxiosApi.insertReview(
        rating, reviewText, goodsDetailId, url
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

  //대표 이미지 추가
  const goodsimgUpload = async () => {
    try {
      // 서버에 데이터 전송
      const response = await GoodsAxiosApi.insertGoodsImg(
        list[0] // 상품 번호
        , newUrl//새 이미지 주소
      );
      if (response.status === 200) {
        // 성공적으로 데이터가 전송되었으면, 리뷰 목록에 새 리뷰 추가    
        window.location.reload();
      } else {
        // 서버에서 응답이 오지 않거나, 응답의 상태 코드가 200이 아닌 경우 에러 처리
        console.error("서버 응답 실패");
      }
    } catch (error) {
      // 네트워크 요청 중에 오류가 발생한 경우 에러 처리
      console.error("submit review 데이터에러 :", error);
    }
  }


  //상품 이미지 추가
  const imgUpload = async () => {
    try {
      // 서버에 데이터 전송
      const response = await PictureAxiosApi.insertGoodsImg(
        list[0],
        newUrl
      );
      if (response.status === 200) {
        // 성공적으로 데이터가 전송되었으면, 리뷰 목록에 새 리뷰 추가    
        window.location.reload();
      } else {
        // 서버에서 응답이 오지 않거나, 응답의 상태 코드가 200이 아닌 경우 에러 처리
        console.error("서버 응답 실패");
      }
    } catch (error) {
      // 네트워크 요청 중에 오류가 발생한 경우 에러 처리
      console.error("submit review 데이터에러 :", error);
    }
  }

  const imgview = (e) => {
    setUrl(e)
  }

  const InfoDesc = ({ value }) => {
    const processedDesc = DOMPurify.sanitize(value);
    return <div dangerouslySetInnerHTML={{ __html: processedDesc }} />;
  }
  useEffect(() => {
    setUrl(list[2])
    setMainUrl(list[2])
  }, list)
  return (
    <GoodsInfoCss>
      <ImgCategory>
        <div className="ImgCategory1">
          <ImgBox>
            <div className="mainImg">
              <img src={url} alt="대표 이미지" />
            </div>
          </ImgBox>
        </div>
        <div className="ImgCategory2">
          <SelectImg num={list[0]} url={mainurl} imgview={imgview} member={member} login={true}>
          </SelectImg>
        </div>
        <NewImgBox>
          {newUrl && <>
            <img src={newUrl} alt="새 이미지" />
          </>
          }
        </NewImgBox>
        <UploadContainer>
          <UploadLabel>
            파일 선택
            <UploadInput type="file" onChange={handleFileUpload} />
          </UploadLabel>
          <UploadLabel>
            대표 이미지로 저장
            <UploadInput type="button" onClick={goodsimgUpload} />
          </UploadLabel>
          <UploadLabel>
            상품 이미지로 저장
            <UploadInput type="button" onClick={imgUpload} />
          </UploadLabel>
        </UploadContainer>


      </ImgCategory>
      <InfoCategory>
        <ul>
          <li>소개</li>
          <li>댓글</li>
          <li>판매자</li>
        </ul>
      </InfoCategory>
      <InfoBox goodsDesc={goodsDesc}>
        {/* 상품 정보 표시 */}
        <InfoDescCss>
          <QuillText goodsDesc={goodsDesc} setGoodsDesc={setGoodsDesc}>
          </QuillText>
        </InfoDescCss>
      </InfoBox>
    </GoodsInfoCss>
  )
}