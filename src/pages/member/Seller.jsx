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
  height: 30px;
  border: 1px solid black;
  margin: 0 auto;
  ul{
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    list-style: none;

    li{
      flex: 1; /* 나머지 항목들에 대해 남은 공간 균등 분배 */
      margin: auto;
      padding: 5px;   
       display: flex;
    justify-content: center;
    }
    .info{
      flex: none; /* .info 클래스에 대해 flex 속성 무시 */
      width: 300px; /* .info 클래스에 대해 고정 너비 설정 */
      background: red;
    }
  }
`;
const Content = styled.div`
  width: 80%;
  height: 30px;
  margin: 0 auto;
  ul{
    
    width: 100%;
    height: auto;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    list-style: none;
    flex-direction: column;
    li{
      border: 1px solid black;
      width: 100%;
      height: 30px;
      flex: 1; /* 나머지 항목들에 대해 남은 공간 균등 분배 */
      margin: auto;
      padding: 5px;   
       display: flex;
    justify-content: center;
    img{
      width: 100px;
      height: 100px;
    }
    }
    .info{
      flex: none; /* .info 클래스에 대해 flex 속성 무시 */
      width: 300px; /* .info 클래스에 대해 고정 너비 설정 */
      background: red;
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
          <li>순서</li>
          <li>이미지</li>
          <li className="info">상품정보</li>
          <li>판매가격</li>
          <li>판매상태</li>
          <li>판매수량</li>
          <li>판매금액</li>
        </ul>
      </Title>


















      <Content>
        <ul>
          {list &&
            list.map((item) => (
              <>
                <li key={item.goodsDetailId} onClick={() => openClick(item.goodsDetailId)}>
                  <div className="no">{item.goodsDetailId}</div>
                  <div className="img">
                    <img src={item.goodsPic} alt="" />
                  </div>
                  <div className="title">{item.goodsTitle}</div>
                  <div className="price">{item.goodsPrice}</div>
                  {/* 판매 상태, 판매 수량, 판매 금액 추가 */}
                  <div className="status">
                    {item.purchase && item.purchase.length > 0 ? item.purchase[0].status : '-'}
                  </div>
                  <div className="count">{item.purchase ? item.purchase.length : 0}</div>
                  <div className="count">{item.purchase ? item.purchase.length * item.goodsPrice : 0}</div>
                </li>
                {/* ... (기타 요소들은 이전과 동일하게 유지합니다) */}
              </>
            ))}
        </ul> </Content>


    </SalseListCss >
  );
};
