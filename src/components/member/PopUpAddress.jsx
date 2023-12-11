import React, { useState } from "react";
import styled from "styled-components";
import { PopUpPost } from "./PopUpPost";
import { PopUpDom } from "./PopUpDom";

// "우편 번호 검색" 버튼 및 팝업창을 관리
const PopupAddrCss = styled.div`
  margin: 0 auto;

  width: 90%;
  height: 40px;

  button {
    border-radius: 10px;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    border: 1px solid rgb(153, 153, 153);
  }
`;
export const PopUpAddress = ({ setInputAdd, setInputAdd2 }) => {
  // 팝업창 상태 관리
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // 팝업창 열기
  const openPostCode = () => {
    setIsPopupOpen(true);
  };

  // 팝업창 닫기
  const closePostCode = () => {
    setIsPopupOpen(false);
  };

  return (
    <PopupAddrCss>
      <button type="button" onClick={openPostCode}>
        우편번호 검색
      </button>

      <div id="popupDom">
        {isPopupOpen && (
          <PopUpDom>
            <PopUpPost
              onClose={closePostCode}
              setInputAdd={setInputAdd}
              setInputAdd2={setInputAdd2}
            />
          </PopUpDom>
        )}
      </div>
    </PopupAddrCss>
  );
};
