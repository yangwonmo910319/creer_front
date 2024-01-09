import styled, { css } from "styled-components";
import { ReviewComp } from "./ReviewComp";
import { ReviewModal } from "../../utils/goods/ReviewModal";
import { useEffect, useState } from "react";
import { ReviewAxiosApi } from "../../api/goods/ReviewAxiosApi";
import { useNavigate } from "react-router-dom";
import { SelectImg } from "./SelectImg";
import * as DOMPurify from 'dompurify';
import { GoodsInfoCss, ImgCategory, ImgBox, InfoBox, NewImgBox, InfoDescCss, InfoCategory } from "../../css/components/goods/GoodsInfo";

export const GoodsInfo = ({ list, reply, member }) => {
    const navigate = useNavigate();
    //back에서 가져온 데이터인 list를 분해하여 사용 
    const [goodsDetailId, goodsDesc, goodsPic, setGoodsDesc, setGoodsPic] = list;
    //Modal Switch
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    //작성자와 로그인 유저 확인용
    const user = localStorage.getItem("userId");
    //큰 이미지 화면 주소
    const [url, setUrl] = useState(list[2]);
    //상품 대표 이미지
    const [mainurl, setMainUrl] = useState(list[2]);
    //상품 대표 이미지 변경시 사용
    const [newUrl, setNewUrl] = useState('');
    //리뷰 모달 닫기
    const closeReviewModal = () => {
        setIsReviewModalOpen(false);
    };
    //리뷰 모달 열기
    const openReviewModal = () => {
        setIsReviewModalOpen(true);

    }
    //상품 정보 수정
    const descChage = (e) => {
        setGoodsDesc(e.target.value)
    }
    //상품 대표 사진 정보를 저장
    useEffect(() => {
        setUrl(list[2])
        setMainUrl(list[2])
    }, [list])

    //리뷰 추가
    const reviewSubmit = async ({ rating, reviewText, url }) => {
        try {
            // 서버에 데이터 전송
            const response = await ReviewAxiosApi.insertReview(
                //별점,내용,상품 PK,사진주소
                rating, reviewText, goodsDetailId, url
            );
            if (response.status === 200) {
                // 성공적으로 데이터가 전송되었으면, 리뷰 목록에 새 리뷰 추가    
                closeReviewModal();
                navigate(0)
            } else {
                // 서버에서 응답이 오지 않거나, 응답의 상태 코드가 200이 아닌 경우 에러 처리
                console.error("서버 응답 실패");
            }
        } catch (error) {
            // 네트워크 요청 중에 오류가 발생한 경우 에러 처리
            console.error("submit review 데이터에러 :", error);
        }
    };
    //대표,서브 이미지 클릭시 메인 화면에 해당 이미지를 보여줌 
    const imgview = (e) => {
        setUrl(e)
    }
    //Quill 데이터를 출력할 때 사용 
    //DOMPurify는 브라우저에서 사용되는 HTML, CSS 등을 정제하고 안전하게 만들어주는 라이브러리입니다.
    //dangerouslySetInnerHTML은 리액트의 이러한 안전성 검사를 우회하고, 특정한 경우에만 HTML 문자열을 렌더링할 수 있도록 허용합니다.
    //보안상 신뢰할 수 있을 때 사용해야 합니다.
    const InfoDesc = ({ value }) => {
        const processedDesc = DOMPurify.sanitize(value);
        return <div dangerouslySetInnerHTML={{ __html: processedDesc }} />;
    }

    return (
        <GoodsInfoCss>
            <div className="form">
                <ImgCategory>
                    <div className="ImgCategory1">
                        <ImgBox>
                            <div className="mainImg">
                                <img src={url} alt="대표 이미지" />
                            </div>
                        </ImgBox>
                    </div>
                    <div className="ImgCategory2">
                        {/* 상품별 서브 이미지를 출력,수정,삭제 컴포넌트 */}
                        <SelectImg num={list[0]} url={mainurl} imgview={imgview} member={member}>
                        </SelectImg>
                    </div>
                    <NewImgBox>
                        {newUrl && <>
                            <img src={newUrl} alt="새 이미지" />
                        </>
                        }
                    </NewImgBox>

                </ImgCategory>
                <InfoCategory>
                    <ul>
                        <li>소개</li>
                        <li>댓글</li>
                        <li>판매자</li>
                    </ul>
                </InfoCategory>
                <InfoBox>
                    {/* 상품 정보 표시 */}
                    <InfoDescCss>
                        <InfoDesc value={(goodsDesc)}
                            placeholder="내용"></InfoDesc>
                    </InfoDescCss>

                    <div
                        style={{
                            width: "100px",
                            whiteSpace: "normal",
                        }}

                    />
                    {/* 리뷰 출력 */}
                    <ReviewComp goodsNum={list[0]} reply={reply}
                        openReviewModal={openReviewModal}></ReviewComp>

                    {/* 리뷰 작성 Madal */}
                    <ReviewModal
                        isOpen={isReviewModalOpen}
                        onSubmit={reviewSubmit}
                        closeModal={closeReviewModal}
                    />
                </InfoBox>

            </div>
        </GoodsInfoCss>
    )
}