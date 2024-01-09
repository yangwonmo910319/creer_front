import { useEffect, useState } from "react";
import { GoodsAxiosApi } from "../../api/goods/GoodsAxiosApi";
import { useNavigate } from "react-router-dom";
import { CheckModal } from "../../utils/goods/CheckModal";
import { OptionBox } from "./OptionBox";
import { AnotherButton } from "../../css/common/AnotherButton";
import { GoodsOptionCss, GoodsStock, Seller, Seller1, Option, GoodsDeliveryFee, Seller2, OptionPrice, Delivery, OptionTitleEdit, OptionCategory, OptionNick, Optionimage } from "../../css/components/goods/GoodsOptionEdit";

export const GoodsOptionEdit = ({ goodsDedail, updateGoodsDetail }) => {

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
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
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
    navigate("/Member/Seller");
  };
  const GoodsTitleChange = (e) => {
    setGoodsTitle1(e.target.value);
    setGoodsTitle(e.target.value);
  };
  const GoodsDeliveryFeeChange = (e) => {
    setGoodsDeliveryFee1(e.target.value);
    setGoodsDeliveryFee(e.target.value);
  };
  const GoodsStockChange = (e) => {
    setGoodsStock1(e.target.value);
    setGoodsStock(e.target.value);
  };
  const GoodsPriceChange = (e) => {
    setGoodsPrice1(e.target.value);
    setGoodsPrice(e.target.value);
  };

  const revertChanges = () => {
    setGoodsTitle1(list.goodsTitle);
    setGoodsPrice1(list.goodsPrice);
    setGoodsStock1(list.goodsRefund);
    setGoodsCategory1(list.goodsCategory);
    setGoodsDeliveryFee1(list.goodsDeliveryFee);
    setRender(!render);
  };

  return (
    <GoodsOptionCss>
      <OptionCategory goodsCategory={goodsCategory} >  {goodsCategory ? goodsCategory : "카테고리"}
        <div className="CategoryRaido">
          <input type="radio" name="goods" id="패션" value="패션" onChange={(e) => { setGoodsCategory(e.target.value) }} />패션
          <br />
          <input type="radio" name="goods" id="쥬얼리" value="쥬얼리" onChange={(e) => { setGoodsCategory(e.target.value) }} />쥬얼리
          <br />
          <input type="radio" name="goods" id="가구" value="가구" onChange={(e) => { setGoodsCategory(e.target.value) }} />가구
          <br />
          <input type="radio" name="goods" id="문구" value="문구" onChange={(e) => { setGoodsCategory(e.target.value) }} />문구
          <br />
          <input type="radio" name="goods" id="반려" value="반려" onChange={(e) => { setGoodsCategory(e.target.value) }} />반려
          <br />
          <input type="radio" name="goods" id="아동" value="아동" onChange={(e) => { setGoodsCategory(e.target.value) }} />아동
          <br />
          <input type="radio" name="goods" id="공예" value="공예" onChange={(e) => { setGoodsCategory(e.target.value) }} />공예
          <br />
        </div>
      </OptionCategory>
      <Seller>
        <Seller1>
          <Optionimage>
            {list.memberDto && <img src={list.memberDto.image} alt="{}"></img>}
          </Optionimage>
        </Seller1>
        <Seller2>
          <OptionNick>{list.memberDto && list.memberDto.nickName}</OptionNick>
          <OptionTitleEdit goodsTitle={goodsTitle}>
            <input type="text" value={goodsTitle} onChange={GoodsTitleChange} />
          </OptionTitleEdit>
        </Seller2>
      </Seller>
      <Delivery>
        <OptionPrice goodsPrice={goodsPrice}>
          가격:
          <input type="text" value={goodsPrice} onChange={GoodsPriceChange} />
        </OptionPrice>
        <GoodsStock goodsStock={goodsStock}>
          재고 :
          <input type="text" value={goodsStock} onChange={GoodsStockChange} />
        </GoodsStock>
        <GoodsDeliveryFee goodsDeliveryFee={goodsDeliveryFee}>
          배송비:
          <input
            type="text"
            value={goodsDeliveryFee}
            onChange={GoodsDeliveryFeeChange}
          />
        </GoodsDeliveryFee>
      </Delivery>
      <Option>
        <AnotherButton width={"150px"} value={"수정 완료"} onClick={() => setModalOpen(!modalOpen)}></AnotherButton>
        <AnotherButton width={"150px"} value={"삭제"} onClick={() => setModalOpen2(!modalOpen2)}></AnotherButton>
      </Option>
      <CheckModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        onSubmit={updateGoodsDetail}
        checkMmessage={"작성하신 글을 수정합니다."}
        revertChanges={revertChanges}
      />
      <CheckModal
        modalOpen={modalOpen2}
        setModalOpen={setModalOpen2}
        onSubmit={deleteGoodsDetail}
        checkMmessage={"작성하신 글을 삭제합니다."}
      />
    </GoodsOptionCss>
  );
};
