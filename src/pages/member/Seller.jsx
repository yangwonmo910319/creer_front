import styled from "styled-components";
import { GoodsAxiosApi } from "../../api/goods/GoodsAxiosApi";
import { useEffect, useState } from "react";
import{PurchaseListModal} from "../../utils/goods/PurchaseListModal"
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

    .listTitle {
      width: 100%;
      height: auto;

      ul {
        display: flex;
        flex-direction: row;

        .li1 {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          width: 200px;
          height: auto;
        }

        .title {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: row;
          justify-content: center;
        }
      }
    }

    .listContent {
      width: 100%;
      height: auto;
      margin-top: 10px;

      ul {
        margin-top: 10px;
        display: flex;
        flex-direction: row;
        border-radius: 8px;
        border: 1px solid black;
        height: 80px;
        align-items: center;

        .li1 {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          width: 200px;
        
        img {
          width: 100%;
          height: 100%;
        }

        }

        .title {
          width: 100%;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
`;
export const Seller = () => {
  const [list, setList] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState('');

  const closeModal = () => {
    setIsOpen(false);
    setContent('');
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
          {list &&
            list.map((item) => (
              <div key={item.goodsDetailId} onClick={() => { setIsOpen(true); setContent(item.id) }}>
                <ul className="ul1">
                  <li className="no li1">{item.goodsDetailId}</li>
                  <li className="img li1"><img src={item.goodsPic} alt="" /></li>
                  <li className="title">{item.goodsTitle}</li>
                  <li className="count li1">{item.count}</li>
                  <li className="price li1">{item.goodsPrice}</li>
                </ul>
              </div>
            ))}
        </div>
      </div>
      <PurchaseListModal
        isOpen={isOpen}
        closeModal={closeModal}
        onConfirm={() => {
          // Confirm 버튼 동작 처리
        }}
      />
    </SalseListCss>
  );
};
