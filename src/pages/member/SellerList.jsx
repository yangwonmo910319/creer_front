import { GoodsAxiosApi } from "../../api/goods/GoodsAxiosApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StatusButton } from "../../css/common/StatusButton";
import { AnotherButton } from "../../css/common/AnotherButton";
import { SalseListCss, Title, Content, Goods1, Goods, Buyer, Buyer1, Buyer2 } from "../../css/page/member/SellerList";

export const SellerList = () => {
  const [status, setStatus] = useState('');
  const [statusOn, setStatusOn] = useState(false);
  const [list, setList] = useState('');
  const [Open, setOpen] = useState(0);

  const navigate = useNavigate();
  const openClick = (e) => {
    setOpen(e);
  };

  useEffect(() => {
    memberRegCheck();
  }, []);

  const memberRegCheck = async () => {
    try {
      const resp = await GoodsAxiosApi.selectMyGoods();
      console.log("내가 작성한 글 : ", resp.data);
      setList(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  const navi = (e) => {
    navigate(`/GoodsEdit/${e}`)
  }

  return (
    <SalseListCss>
      <h3> 판매 상품 목록</h3>
      <Title>
        <ul>
          <li className="no">순서</li>
          <li className="img">이미지</li>
          <li className="info">상품정보</li>
          <li>판매가격</li>
          <li>판매상태</li>
          <li>재고</li>
          <li>판매 량</li>
          <li>판매금액</li>
        </ul>
      </Title>

      <Content>

        {list &&
          list.map((item) => (

            <Goods key={item.goodsDetailId} >
              <Goods1 >
                <div className="no">{item.goodsDetailId}
                  <AnotherButton width={"45px"} height={"20px"} value={'수정'} onClick={() => { navi(item.goodsDetailId) }}> </AnotherButton>
                </div>
                <div onClick={() => openClick(item.goodsDetailId)}  >
                  <div className="img">
                    <img src={item.goodsPic} alt="" />
                  </div>
                  <div className="title">{item.goodsTitle}</div>
                  <div className="price">{item.goodsPrice}</div>
                  <div className="Status">{item.goodsStatus}</div>
                  <div className="Stock">{item.goodsStock}</div>
                  <div className="count">{item.purchase ? item.purchase.length : 0}</div>
                  <div className="count">{item.purchase ? item.purchase.length * item.goodsPrice : 0}</div>
                </div>
              </Goods1>
              {Open === item.goodsDetailId && item.purchase && (
                <Buyer>
                  <Buyer1>
                    <div className="id">번호 </div>
                    <div className="nickName">닉네임 </div>
                    <div className="address">주소 </div>
                    <div className="option">옵션   </div>
                    <div className="quantity">구매량  </div>
                    <div className="price">구매 금액 </div>
                    <div className="status" >판매 상황 </div>
                  </Buyer1>


                  <Buyer2>   {item.purchase.map((purchaseItem) => (
                    <>
                      <div key={purchaseItem.id} className="buyer2">
                        <div className="id"> {purchaseItem.id}</div>
                        <div className="nickName">   {purchaseItem.buyer.nickName}</div>
                        <div className="address">   {purchaseItem.receiveAdd}</div>
                        <div className="option">   {purchaseItem.option}</div>
                        <div className="quantity">  {purchaseItem.quantity}</div>
                        <div className="price">  {item.goodsPrice * purchaseItem.quantity}</div>
                        <div className="status" onClick={() => {
                          setStatus(purchaseItem.status)
                          setStatusOn(purchaseItem.id)
                        }}>  {purchaseItem.status}</div>
                      </div>
                      <div>
                        <StatusButton
                          id={purchaseItem.id} //기본키
                          status={purchaseItem.status}//값                   
                          setStatus={setStatus}
                          statusOn={statusOn} //모달 켜기
                          setStatusOn={setStatusOn}//모달끄기
                          memberRegCheck={memberRegCheck}
                        /></div>
                    </>
                  ))}</Buyer2>
                </Buyer>
              )}
            </Goods>
          ))}
      </Content>


    </SalseListCss >
  );
};
