import styled from "styled-components";
import { GoodsInfo } from "../../components/goods/GoodsInfo";
import { GoodsAxiosApi } from "../../api/goods/GoodsAxiosApi";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AuctionOption } from "../../components/goods/AuctionOption";

const GoodsDetailCss = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  width: 90%;
  height: auto;
  margin-top: 100px;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: auto;
    grid-template-areas:
      "option"
      "info";
  }
`;

export const AuctionDetail = () => {
  //상품 PK로 해당 데이터를 가져옵니다. 
  const { goodsId } = useParams();
  //Axios로 결과 값을 담아서 출력에 사용
  const [list, setList] = useState("");
  //상품 카테고리 
  const [goodsCategory, setGoodsCategory] = useState("");
  //상품 카테고리 
  const [goodsDeliveryFee, setGoodsDeliveryFee] = useState("");
  //상품 정보
  const [goodsDesc, setGoodsDesc] = useState("");
  //상품 PK
  const [goodsDetailId, setGoodsDetailId] = useState("");
  //상품 대표 사진
  const [goodsPic, setGoodsPic] = useState("");
  //상품 가격
  const [goodsPrice, setGoodsPrice] = useState("");
  //상품 수량
  const [goodsStock, setGoodsStock] = useState("");
  //상품 제목
  const [goodsTitle, setGoodsTitle] = useState("");
  //상품 옵션
  const [auctionDate, setAuctionDate] = useState("");
  //작성자 데이터
  const [memberDto, setMemberDto] = useState("");
  //랜더링에 사용
  const [render, setrender] = useState(true);


  const chagerende = () => {
    setrender(prevRender => !prevRender);
  }
  // 상품 정보를 가져옵니다.
  useEffect(() => {
    //함수 만들기

    //함수 실행
    SelectGoodsLIst();
  }, [goodsId]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     SelectGoodsLIst();
  //     window.location.href = window.location.href; // 현재 페이지 URL로 이동하여 새로고침
  //   }, 30000); // 30초마다 실행

  //   return () => clearInterval(interval); // 컴포넌트 언마운트 시 clearInterval
  // }, []);
  const SelectGoodsLIst = async () => {
    try {
      const rsp = await GoodsAxiosApi.selectGoods(goodsId);
      // 상품 정보를 가져옵니다.
      console.log(rsp.data);
      //가져온 데이터를 저장
      setList(rsp.data);
    } catch (error) {
      console.log(error);
    }
  };
  //back에서 가져온 상품 정보를 분해,저장 합니다.
  //화면을 좌,우 2개의 컴포넌트를 사용하여 출력하기 때문에 
  //좌,우 컴포넌트 별로 사용할 데이터를 재할당합니다.
  useEffect(() => {
    if (list) {
      const {
        goodsCategory,
        goodsDeliveryFee,
        goodsDesc,
        goodsDetailId,
        goodsPic,
        goodsPrice,
        goodsStock,
        goodsTitle,
        auctionDate,
        memberDto,
      } = list;

      setGoodsCategory(goodsCategory);
      setGoodsDeliveryFee(goodsDeliveryFee);
      setGoodsDesc(goodsDesc);
      setGoodsDetailId(goodsDetailId);
      setGoodsPic(goodsPic);
      setGoodsPrice(goodsPrice);
      setGoodsStock(goodsStock);
      setGoodsTitle(goodsTitle);
      setAuctionDate(auctionDate);
      setMemberDto(memberDto);
    }
  }, [list]);

  //화면 왼쪽 상품 정보 출력 컴포넌트로 전달할 데이터
  const goodsInfoList = [
    goodsDetailId,
    goodsDesc,
    goodsPic,
    setGoodsDesc,
    setGoodsPic,
  ];
  //화면 오른쪽 상품 옵션 출력 컴포넌트로 전달할 데이터
  const goodsOptionList = [
    list,
    setGoodsTitle,
    setGoodsPrice,
    setGoodsStock,
    setAuctionDate,
    setGoodsDeliveryFee,
    setGoodsCategory,
    setMemberDto,
  ];

  return (
    <GoodsDetailCss>
      {/* 상품 상세정보,리뷰,사진을 출력,작성,수정,삭제 */}
      <GoodsInfo
        list={goodsInfoList}
        reply={list.reviews}
        member={memberDto.nickName}
      ></GoodsInfo>
      {/* 상품 가격,이름,작성자 정보를 출력,작성,수정,삭제 */}
      <AuctionOption
        goodsDedail={goodsOptionList}
        chagerende={chagerende}
        SelectGoodsLIst={SelectGoodsLIst}
      ></AuctionOption>
    </GoodsDetailCss>
  );
};
