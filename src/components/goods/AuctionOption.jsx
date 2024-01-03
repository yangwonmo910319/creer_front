import { useEffect, useState } from "react";
import styled from "styled-components";
import { AuctionTime } from "../auction/AuctionTime";
import { useNavigate } from "react-router-dom";
import { AnotherButton } from "../../css/common/AnotherButton";
import { GoodsAxiosApi } from "../../api/goods/GoodsAxiosApi";


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
  const [goodsCategory, setGoodsCategory1] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [id, setId] = useState("");
  const chagePrice = (e) => {
    setNewPrice(e.target.value)
  }
  //댓글 추가,삭제 axios를 실행 후 reset값을 바꿔서 useEffect를 실행하여 추가 삭제된 화면을 새로 보여줌
  useEffect(() => {
    setGoodsTitle1(list.goodsTitle);
    setGoodsCategory1(list.goodsCategory);
    setId(list.goodsDetailId);
  }, [list]);

  const submit = async () => {
    if (list.goodsPrice > newPrice) {
      // 기존 가격이 새로운 가격보다 큰 경우 아무것도 하지 않습니다.
    } else {
      await auctionPrice();  // 입찰 가격을 업데이트합니다.
      chagerende(); // 렌더링 상태를 변경합니다.
      await SelectGoodsLIst(); // 상품 정보를 다시 가져옵니다.
    }
  }
  const auctionPrice = async () => {
    try {
      const rsp = await GoodsAxiosApi.goodsPrice(id, newPrice);
      console.log(rsp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // newPrice 상태가 변경될 때마다 수행할 작업
  }, [newPrice]);
  const currentDateTime = new Date();
  // list.auctionDate를 JavaScript Date 객체로 변환
  const auctionDateTime = new Date(list.auctionDate);
  // list.auctionDate가 현재 시간 이후인지 확인하여 true,false를 입력
  const timeOut = currentDateTime > auctionDateTime;
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
        </div>
        <div className="d2">

          {timeOut ? null : <>
            <input type="number" value={newPrice} onChange={chagePrice} placeholder="입찰 희망가" />
            {list.goodsPrice > newPrice && newPrice !== "" && <>기존 가격보다 작습니다</>}</>
          }
        </div>
        <div className="d3">
          <AnotherButton value="입찰" onClick={submit} />
        </div>


      </Participate>

      {/* 
      <Option>
        <div className="option1">
          <OptionBox list={list.options} list2={list} ></OptionBox>
        </div>
      </Option> */}

    </GoodsOptionCss>
  );
};
