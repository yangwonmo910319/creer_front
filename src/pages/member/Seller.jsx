import styled from "styled-components";
import { GoodsAxiosApi } from "../../api/goods/GoodsAxiosApi";
import { useEffect, useState } from "react";
import { PurchaseListModal } from "../../utils/goods/PurchaseListModal";

const SalseListCss = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`

  width: 80%;
  height: auto;
  border: 1px solid black;
  margin: 0 auto;
  font-size: .8em;
  ul{
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    list-style: none;

    li{
      flex: 1; /* 나머지 항목들에 대해 남은 공간 균등 분배 */
      margin: auto;
      padding: 0;
       display: flex;
    justify-content: center;
    }
    .no{
      flex: none;
      width: 50px; 
    }
    .info{
      flex: none;
      width: 200px;
  
    }
    .img{
        flex: none;
      width: 100px;
  
    }
  }
`;
const Content = styled.div`
  width: 80%;
  height: auto;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  img{
    width: 100px;
    height: 100px;
  }
`;

const Goods1 = styled.li`
  display: flex;
  align-items: center;
  flex-direction: row;
  div{    
    flex:1; 
    border-top: none;
    display: flex;
  align-items: center;
  justify-content: center;
  }

  .no{
    flex: none;
    width: 50px;
  }
    .img{
    flex: none;
    width: 100px;
  }
`;
const Goods = styled.ul` 
padding: 0;
  width: 100%;
  height: auto;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  list-style:none;
  border: 1px solid black;
  .title{   
    width: 200px;
    flex:none;
  }
`;
const Buyer = styled.div`
  width: 100%;
  height: auto;
  margin: 0 auto;   

`;
const Buyer1 = styled.li`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: row;
  div{  
    width: 100%;
    height: 30px;
    border  :1px solid black ;
    flex:1; 
    display: flex;
  align-items: center;
  justify-content: center;
  }
  .id{
    flex:none;
    width: 50px;
  }
  .quantity{
   flex:none;
width: 50px;
}
`;

const Buyer2 = styled.li`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;

.buyer2{
  height: auto;
display: flex;
width: 100%;

div{
flex: 1;
border: 1px solid black;
display: flex;
justify-content: center;
align-items: center;
}.id{
  flex:none;
width: 50px;
}
.quantity{
   flex:none;
width: 50px;
}
}
  
    
`;
export const Seller = () => {
  const [list, setList] = useState('');
  const [Open, setOpen] = useState(0);
  const [content, setContent] = useState('');

  const openClick = (e) => {
    setOpen(e);
  };

  useEffect(() => {
    const memberRegCheck = async () => {
      try {
        const resp = await GoodsAxiosApi.getMyGoods();
        console.log("내가 작성한 글 : ", resp.data);
        setList(resp.data);
      } catch (error) {
        console.log(error);
      }
    };
    memberRegCheck();
  }, []);

  return (
    <SalseListCss>
      <h3> 판매 상품 리스트</h3>
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
    <Goods key={item.goodsDetailId} onClick={() => openClick(item.goodsDetailId)}>
     <Goods1> <div className="no">{item.goodsDetailId}</div>
      <div className="img">
        <img src={item.goodsPic} alt="" />
      </div>
      <div className="title">{item.goodsTitle}</div>
      <div className="price">{item.goodsPrice}</div>
      <div className="Status">{item.goodsStatus}</div>
      <div className="Stock">{item.goodsStock}</div>
      <div className="count">{item.purchase ? item.purchase.length : 0}</div>
      <div className="count">{item.purchase ? item.purchase.length * item.goodsPrice : 0}</div>
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
            <div className="status">결재 상황 </div>  </Buyer1> 
          <Buyer2>   {item.purchase.map((purchaseItem) => (
            <div key={purchaseItem.id} className="buyer2">
            <div className="id"> {purchaseItem.id}</div> 
            <div className="nickName">   {purchaseItem.buyer.nickName}</div> 
            <div className="address">   {purchaseItem.buyer.address}</div> 
            <div className="option">   {purchaseItem.buyer.option}</div> 
            <div className="quantity">  {purchaseItem.quantity}</div> 
            <div className="price">  {item.goodsPrice*purchaseItem.quantity}</div> 
            <div className="status">  {purchaseItem.status}</div> 
            </div>
          ))}</Buyer2>
        </Buyer>
      )}
    </Goods>
  ))}
        </Content>


    </SalseListCss >
  );
};
