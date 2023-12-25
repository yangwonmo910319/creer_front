import { useEffect, useState } from "react";
import styled from "styled-components";
import { GoodsAxiosApi } from "../../api/goods/GoodsAxiosApi";
import { useNavigate } from "react-router-dom";
import { CheckModal } from "../../utils/goods/CheckModal";
import { OptionBox } from "./OptionBox";

const GoodsOptionCss = styled.div`
  width: 35%;
  height: auto;
  @media (max-width: 768px) {
    width: 500px;
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
    width: 100px;
    height: 100px;
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
  width: 50px;
  height: 20px;
  border-radius: 15px;
  display: flex;
  color: white;
  background: #adadad;
  justify-content: center;
`;

const OptionTitleEdit = styled.div`
  width: 100%;

  font-size: 2em;
  line-height: 1.2em;
  padding-bottom: 20px;
`;
const Delivery = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  padding-left: 10px;
`;
const OptionPrice = styled.div`
  width: 100%;
  position: relative;
  margin-top: 20px;
  right: 0;
  font-size: 1.5em;
  margin-right: 100px;
  input {
    width: 70%;
    font-size: 1em;
    height: 40px;
    border: 2px solid red;
  }
`;
const GoodsDeliveryFee = styled.div`
  font-size: 1em;
  width: 100%;
  margin-top: 10px;
  input {
    font-size: 1em;
    width: 73%;
    border: 2px solid red;
  }
`;

const GoodsRefund = styled.div`
  font-size: 1em;
  margin-top: 10px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(136, 136, 136, 0.673);
  width: 100%;
  input {
    font-size: 1em;
    width: 65%;
    border: 2px solid red;
  }
`;

const Option = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  .option1 {
    width: 90%;
    height: auto;
  }
  .sell {
    display: flex;
    justify-content: space-around;
    width: 60%;
    height: 80px;
    margin: 0;

    .sell1-1,
    .sell1-2 {
      width: 110px;
      height: 80px;
      margin: 10px;
      border-radius: 10px;
      background-color: #fbf3d8;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .sell1-3 {
    border-radius: 10px;
    width: 60%;
    height: 20px;
    background-color: #fbf3d8;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
  }
  .sell1-4 {
    border-radius: 10px;
    width: 60%;
    height: 50px;
    color: white;
    background-color: #f00d33;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
  .sell1-5 {
    margin-top: 10px;
  }
`;
export const GoodsOption = ({ goodsDedail, updateGoodsDetail }) => {
  const [
    list,
    setGoodsTitle,
    setGoodsPrice,
    setGoodsStock,
    setGoodsDeliveryFee,
    setGoodsCategory,
    setMemberDto,
  ] = goodsDedail;
  const [goodsTitle, setGoodsTitle1] = useState("");
  const [goodsCategory, setGoodsCategory1] = useState("");
  const [goodsPrice, setGoodsPrice1] = useState("");
  const [goodsStock, setGoodsStock1] = useState("");

  const [goodsDeliveryFee, setGoodsDeliveryFee1] = useState("");
  const [isCheckModalOpen, setIsCheckModalOpen] = useState(false);
  const [render, setRender] = useState(false);
  const navigate = useNavigate();
  //댓글 추가,삭제 axios를 실행 후 reset값을 바꿔서 useEffect를 실행하여 추가 삭제된 화면을 새로 보여줌
  useEffect(() => {
    setGoodsTitle1(list.goodsTitle);
    setGoodsPrice1(list.goodsPrice);
    setGoodsStock1(list.goodsStock);
    setGoodsDeliveryFee1(list.goodsDeliveryFee);
    setGoodsCategory1(list.goodsCategory);
  }, [list]);
  //삭제 버튼을 누르면 실행
  const deleteGoodsDetail = () => {
    //게시글 삭제 기능을 만듬
    const deleteGoods = async () => {
      try {
        const Delete = await GoodsAxiosApi.deleteGoods(list.goodsDetailId);
      } catch (error) {
        console.log(error);
      }
    };
    //게시글 삭제 기능을 실행
    deleteGoods();
    //reset값을 변경하여 댓글 업데이트 화면을 보여줌
    // setReset(!reset);
    navigate("/");
  };
  const GoodsTitleChange = (e) => {
    setGoodsTitle1(e.target.value);
    setGoodsTitle(e.target.value);
  };
  const GoodsDeliveryFeeChange = (e) => {
    setGoodsDeliveryFee1(e.target.value);
    setGoodsDeliveryFee(e.target.value);
  };
  const GoodsRefundChange = (e) => {
    setGoodsStock1(e.target.value);
    setGoodsStock(e.target.value);
  };
  const GoodsPriceChange = (e) => {
    setGoodsPrice1(e.target.value);
    setGoodsPrice(e.target.value);
  };
  const GoodsCategoryChange = (e) => {
    setGoodsCategory1(e.target.value);
    setGoodsCategory(e.target.value);
  };

  const revertChanges = () => {
    setGoodsTitle1(list.goodsTitle);
    setGoodsPrice1(list.goodsPrice);
    setGoodsStock1(list.goodsStock);
    setGoodsCategory1(list.goodsCategory);
    setGoodsDeliveryFee1(list.goodsDeliveryFee);
    setRender(!render);
  };

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
      <Delivery>
        <OptionPrice>{goodsPrice} 원</OptionPrice>
        <GoodsDeliveryFee>재고:{goodsStock}</GoodsDeliveryFee>
        <GoodsRefund>배송 시작: {goodsDeliveryFee} </GoodsRefund>
      </Delivery>

      <Option>
        <div className="option1">
          <OptionBox list={list.options} list2={list} ></OptionBox>
        </div>
      </Option>

    </GoodsOptionCss>
  );
};
