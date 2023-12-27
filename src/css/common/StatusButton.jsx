import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { PurchaseAxiosApi } from '../../api/goods/PurchaseAxiosApi';

const BtnCss = styled.div`
  width: 100%;
  height: 20px;
display: flex;
flex-direction: row;
background: white;
float: right;    border: 1px solid black;
  input {

    flex: 1;
    width: 60px;
    height: 10px;
  }
`;
export const StatusButton = ({ id, status, setStatus, statusOn, setStatusOn }) => {

  const click = (e) => {
    setStatusOn(false);
    const updateStatus = async () => {
      try {
        const update = await PurchaseAxiosApi.update(

        );
      } catch (error) {
        console.log(error);
      }
    };
    updateStatus()



  }


  useEffect(() => {
    // statusOn 값이 변경될 때마다 처리할 내용을 작성할 수 있습니다.
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
            checked={status === '결제 전'} // status가 '결제 전'인 경우 체크되도록 설정
          />
          결제 전
          <input
            type="radio"
            name="goods"
            id="배송 중"
            value="배송중"
            onChange={(e) => { click(e) }}
            checked={status === '배송중'} // status가 '배송중'인 경우 체크되도록 설정
          />
          배송 중
          <input
            type="radio"
            name="goods"
            id="배송 확인"
            value="배송 확인"
            onChange={(e) => { click(e) }}
            checked={status === '배송 확인'} // status가 '배송 확인'인 경우 체크되도록 설정
          />
          배송 확인
        </BtnCss>
      ) : <></>}
    </>
  );
};