import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OptionBox } from "./OptionBox";
import { Option, GoodsRefund, GoodsDeliveryFee, OptionPrice, Delivery, OptionTitleEdit, OptionCategory, GoodsOptionCss, OptionNick, Optionimage, Seller2, Seller, Seller1 } from "../../css/components/goods/GoodsOption";
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
