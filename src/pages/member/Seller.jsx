import styled from "styled-components";
import { GoodsAxiosApi } from "../../api/goods/GoodsAxiosApi";
import { useEffect, useState } from "react";
import { PurchaseListModal } from "../../utils/goods/PurchaseListModal";

const SalseListCss = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;

  .list {
    margin: 0 auto;
    width: 80%;
    height: auto;
    display: flex;
    flex-direction: column;

    .listContent {
      width: 100%;
      height: auto;
      margin-top: 10px;     
      ul{
        display: flex;
        flex-direction: column;
        list-style: none;
        width: 100%;
        border-top: none; 
        height: auto;
        padding: 0;
        li:first-child {
    border-top: 1px solid black;
        }
      }
      li{       
        border: 1px solid black;
        border-top: none;
        display: flex;
        width: 100%;
        height: 150px;
        padding: 0;
        .img{
          width: 130px;
        height: auto;

        img{
          width: 100px;
        height: 100px;

        }
   
      }
      .price{
          width: 150px;
          margin-right: 10px;
        }
        div{     
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
      }
      .no{
        width: 80px;     
      }
      .title{
        width: 60%;     
      }
      .count{
        width: 120px;      
     }
     .nickName{
      width: auto;

      border-right: 1px 
     }
     .status{
      margin-right: 10px;
      width: 150px;      
     }
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
      <div className="list">
        <div className="listContent">
          <ul>
            {list &&
              list.map((item) => (<>

                <li key={item.goodsDetailId} onClick={() => {
                  openClick(item.goodsDetailId)
                }}>
                  <div className="no">{item.goodsDetailId}</div>
                  <div className="img "><img src={item.goodsPic} alt="" /></div>
                  <div className="title">{item.goodsTitle}</div>
                  {/* Array.isArray( ) 배열인지 아닌지 확인 후 true,false를 반환*/}
                  <div className="count">{Array.isArray(item.purchase) ? item.purchase.length : 0}</div>
                  <div className="price ">{item.goodsPrice}</div>

                </li>
                {item.goodsDetailId === Open &&
                  <ul className="buyer">
                    {item.purchase &&
                      item.purchase.map((item1, index) => (
                        <li key={index.id}>
                          <div className="no"> {item1.id}</div>
                          <div className="img "><img src={item1.buyer.image} alt="" /></div>
                          <div className="nickName ">{item1.buyer.nickName}</div>
                          <div className="title">{item1.buyer.address}</div>
                          <div className="title">{item1.option}</div>
                          <div className="count">{item1.quantity}</div>
                          <div className="count">{item1.quantity * item.goodsPrice}</div>
                          <div className="status">{item1.status}</div>


                        </li>
                      ))}
                  </ul >
                }


              </>))}
          </ul>
        </div>
      </div>


    </SalseListCss >
  );
};
