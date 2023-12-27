import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { PurchaseAxiosApi } from '../../api/goods/PurchaseAxiosApi';

const BtnCss = styled.div`
  width: 100%;
  height: 20px;
display: flex;
flex-direction: row;
background: white;
float: right;  

  input {

    flex: 1;
    width: 60px;
    height: 10px;
  }
`;
export const StatusButton = ({ id, status, setStatus, statusOn, setStatusOn }) => {
  const [content, setContent] = useState()
  const click = (e) => {
    setStatusOn(false);
    setStatus(e.target.value)
    setContent(e.target.value); // 클릭된 라디오 버튼의 값을 content 상태로 설정
    updateStatus(e.target.value); // 변경된 값으로 updateStatus 호출
  }

  const updateStatus = async (newContent) => {
    try {
      const update = await PurchaseAxiosApi.update(id, newContent); // content 대신 newContent를 넘겨줌
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setContent(status)
  }, [statusOn]);

  return (
    <>
      {id === statusOn ? (
        <BtnCss>
          <input
            type="radio"
            name="goods"
            id="결제 전"
            value="결제 전"
            onChange={(e) => { click(e) }}
            checked={status === '결제 전'}
          />
          결제 전
          <input
            type="radio"
            name="goods"
            id="결제 확인"
            value="결제 확인"
            onChange={(e) => { click(e) }}
            checked={status === '결제 확인'}
          />
          결제 확인
          <input
            type="radio"
            name="goods"
            id="배송 중"
            value="배송중"
            onChange={(e) => { click(e) }}
            checked={status === '배송중'}
          />
          배송 중
          <input
            type="radio"
            name="goods"
            id="배송 확인"
            value="배송 확인"
            onChange={(e) => { click(e) }}
            checked={status === '배송 확인'}
          />
          배송 확인
        </BtnCss>
      ) : <></>}
    </>
  );
};