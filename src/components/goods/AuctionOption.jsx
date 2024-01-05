import { useEffect, useState } from "react";
import styled from "styled-components";
import { AuctionTime } from "../auction/AuctionTime";
import { useNavigate } from "react-router-dom";
import { AnotherButton } from "../../css/common/AnotherButton";
import { GoodsAxiosApi } from "../../api/goods/GoodsAxiosApi";
import { CartAxiosApi } from "../../api/goods/CartAxiosApi";
import { AuctionModal } from "../../utils/goods/AuctionModal";


const GoodsOptionCss = styled.div`
  width: 35%;
  height: auto;
  @media (max-width: 768px) {
    width: 50%;
    margin: 0 auto;
    grid-area: option;
  }
`;

const Seller = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  border-bottom: 1px solid rgba(136, 136, 136, 0.673);
  /* justify-content: center; */
  align-items: center;
  margin-top: 20px;
  font-size: .8em;
`;

const Seller1 = styled.div`
  width: 100px;
  height: 100%;
  display: flex;
  /* justify-content: center; */
  align-items: center;
`;

const Seller2 = styled.div`
  width: calc(100% - 100px);
  display: flex;
  position: relative;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  padding: 10px;
`;
const Optionimage = styled.div`
  img {
    border-radius: 50px;
    border: 2px solid #a8a8a8;
    width: 80px;
    height: 80px;
    margin-bottom: 40px;
  }
`;
const OptionNick = styled.div`
  width: 100%;
  position: absolute;
  padding: 10px;
  left: 0;
  top: -25px;
`;
const OptionCategory = styled.div`
  width: 70px;
  height: 25px;
  border-radius: 15px;
  display: flex;
  color: white;
  background: #adadad;
  justify-content: center;
  border: 1px solid  #727272;
`;

const OptionTitleEdit = styled.div`
  width: 100%;

  font-size: 2em;
  line-height: 1.2em;
  padding-bottom: 20px;
`;

const Participate = styled.div`

  width: 100%;
  height: auto;
  margin-top: 10px;

  .d1{   margin-top: 20px;

     font-size: 1.3em;
  }
    .d2{  margin-top: 20px;
     font-size: 1.2em;
     display: flex;
     color: #606060;
     flex-direction: column;
     padding-bottom: 20px;
     border-bottom: 1px solid #bfbebe;
  }
    .d3{   
      display: flex;
      justify-content: center;
      margin-top: 20px;
     font-size: 1.3em;
  }
  input {
    margin-top: 10px;
    font-size: .7em;
    height: 30px;
    width: 100%;
  }
`;

export const AuctionOption = ({ goodsDedail, chagerende, SelectGoodsLIst }) => {
  const [
    list,
  ] = goodsDedail;

  const [goodsTitle, setGoodsTitle1] = useState("");
  const [content, setContent] = useState({});
  const [goodsCategory, setGoodsCategory1] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [id, setId] = useState("");
  const [buyer, setBuyer] = useState('')
  const [modalOpen, setModalOpen] = useState(false);
  //판매자
  const [seller, setSeller] = useState();
  //옵션
  const [option, setOption] = useState("기본");
  //상태
  const [status, setStatus] = useState("결제 전");
  const chagePrice = (e) => {
    setNewPrice(e.target.value)
  }
  //댓글 추가,삭제 axios를 실행 후 reset값을 바꿔서 useEffect를 실행하여 추가 삭제된 화면을 새로 보여줌

  const submit = async () => {
    await auctionPrice();  // 입찰 가격을 업데이트합니다.
  }
  //입찰 버튼 클릭시 가격과 구매자 등록
  const auctionPrice = async () => {
    try {
      const rsp = await GoodsAxiosApi.goodsPrice(id, newPrice);
      console.log(rsp);
      if (rsp.data !== false) {
        chagerende(); // 렌더링 상태를 변경합니다.
        SelectGoodsLIst(); // 상품 정보를 다시 가져옵니다.
      } else {
        setModalOpen(true);
      }

    } catch (error) {
      console.log(error);
    }
  };

  const auctionPrice2 = async (e) => {
    try {
      const rsp = await GoodsAxiosApi.goodsPrice2(id, e);
      console.log(rsp);
      if (rsp.data !== false) {
        chagerende(); // 렌더링 상태를 변경합니다.
        SelectGoodsLIst(); // 상품 정보를 다시 가져옵니다.
      }
    } catch (error) {
      console.log(error);
    }
  };

  const currentDateTime = new Date();
  // list.auctionDate를 JavaScript Date 객체로 변환
  const auctionDateTime = new Date(list.auctionDate);
  // list.auctionDate가 현재 시간 이후인지 확인하여 true,false를 입력
  const timeOut = currentDateTime > auctionDateTime;




  // 장바구니 담기

  const cartAdd = async () => {

    try {
      console.log("장바구니에 담을 content 정보 : " + JSON.stringify(content));
      const res = await CartAxiosApi.addToCart2(content, buyer);
      if (res && res.status === 200) {
        console.log("장바구니에 물품을 담았습니다.");
        console.log(res.data);
        return res.data;
      } else {
        console.error("장바구니에 물품을 담는데 실패했습니다.", res);
      }
    } catch (error) {
      // 오류가 발생한 경우
      console.error("장바구니에 물품을 담는데 실패했습니다.", error);
    }
  };
  useEffect(() => {
    // 구매자 정보 업데이트
    const updateBuyer = async () => {
      if (list && list.goodsStatus && typeof list.goodsStatus === 'string') {
        setGoodsTitle1(list.goodsTitle);
        setGoodsCategory1(list.goodsCategory);
        setId(list.goodsDetailId);
        const auction = list.goodsStatus;
        const splitted = auction.split('='); // '='를 기준으로 문자열 분할
        await setBuyer(splitted[1] ? splitted[1].trim() : ''); // 공백 제거 후 '이름' 추출
        console.log('list.goodsStatus:', list.goodsStatus); // list.goodsStatus 확인
        console.log('buyer:', buyer); // buyer값 확인
      }
    };

    // 상품 정보 업데이트
    setContent({
      goodsDetailId: list.goodsDetailId, //상품 PK
      title: list.goodsTitle, //상품 제목
      goodsImg: list.goodsPic, //상품 이미지
      price: list.goodsPrice, //가격      
    });

    // 경매 시간 체크
    const currentDateTime = new Date();
    const auctionDateTime = new Date(list.auctionDate);
    const timeOut = currentDateTime > auctionDateTime;
    if (timeOut) {
      console.log('현재 경매 종료 시간을 지났습니다.');
      // 경매 종료 시간을 이미 지났으므로 알림 등의 동작 수행
    } else {
      console.log('아직 경매 종료 시간이 아닙니다.');
      const timeDifference = auctionDateTime - currentDateTime;
      const timer = setTimeout(() => {
        console.log('알람 시간입니다!');
        cartAdd();
        // 여기서 알람이 울리도록 원하는 동작 수행
      }, timeDifference);
    }

    // 최초 실행 시 updateBuyer 호출
    updateBuyer();
  }, [list, buyer, option, status]);
  return (
    <GoodsOptionCss>
      <OptionCategory>{goodsCategory}</OptionCategory>
      <Seller>
        <Seller1>
          <Optionimage>
            {list.memberDto && <img src={list.memberDto.image} alt="{}"></img>}
          </Optionimage>
        </Seller1>
        <Seller2>
          <OptionNick>{list.memberDto && list.memberDto.nickName}</OptionNick>
          <OptionTitleEdit>{goodsTitle} </OptionTitleEdit>
        </Seller2>
      </Seller>

      <AuctionTime time={list.auctionDate} />

      <Participate >
        <div className="d1">
          현재 가 {list.goodsPrice}원
          <br />
        </div>
        <div className="d2">
          {timeOut ? null : <>
            <input type="number" value={newPrice} onChange={chagePrice} placeholder="입찰 희망가" />
            {list.goodsPrice > newPrice && newPrice !== "" && <>기존 가격보다 작습니다</>}</>
          }
        </div>

        {timeOut ? <>입찰이 종료되었습니다.</> : <><div className="d3">
          <AnotherButton value="입찰" onClick={submit} />
        </div>
        </>
        }
      </Participate>
      <AuctionModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        onSubmit={auctionPrice2}
        checkMmessage={'입력하시 금액보다 가격이 올랐습니다.'}
        setNewPrice={setNewPrice}
        newPrice={newPrice}
      >
      </AuctionModal>


    </GoodsOptionCss>
  );
};
