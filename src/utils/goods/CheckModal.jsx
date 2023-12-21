import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
const ModalClickCss = styled.div`
  position: absolute;
  margin: 0;
  top: 0;
  left: 0;
`;
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 0.3s;
  z-index: 999;
`;

const Message = styled.div`
  width: 600px;
  height: 50px;
  border-radius: 10px;
  background: rgb(255, 255, 255);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SubmitButton = styled.button`
  position: relative;
  display: inline-block;
  cursor: pointer;
  outline: none;
  border: 0;
  margin: 50px;
  vertical-align: middle;
  text-decoration: none;
  font-size: inherit;
  font-family: inherit;
  font-weight: 600;
  color: #382b22;
  text-transform: uppercase;
  padding: 1.25em 2em;
  background: #fffd7f;
  border: 2px solid #ffeaa3;
  border-radius: 0.75em;
  transform-style: preserve-3d;
  transition: transform 150ms cubic-bezier(0, 0, 0.58, 1),
    background 150ms cubic-bezier(0, 0, 0.58, 1);
  &:hover {
    background: #ffeaa3;
    transform: translate(0, 0.25em);
  }
`;

const Button = styled.div``;

export const CheckModal = ({
  // 기본값 설정
  isOpen = false,
  setIsCheckModalOpen = () => { },
  onSubmit = () => { },
  checkMmessage = "",
  revertChanges = () => { },
}) => {
  const navigate = useNavigate();
  // 모달 바깥 부분 클릭 시,
  const modalClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsCheckModalOpen();
    }
  };

  //확인버튼 누르면
  const CheckClick = () => {
    onSubmit();
    setIsCheckModalOpen();
    navigate(0)
  };

  //취소버튼 누르면
  const closeClick = () => {
    revertChanges();
    setIsCheckModalOpen();
  };

  return (
    <ModalClickCss>
      {isOpen && (
        <>
          <ModalWrapper ModalWrapper onClick={modalClick}>
            <Message>{checkMmessage}</Message>
            <Button>
              <SubmitButton onClick={CheckClick}>확 인</SubmitButton>
              <SubmitButton onClick={closeClick}>취 소</SubmitButton>
            </Button>
          </ModalWrapper>
        </>
      )}
    </ModalClickCss>
  );
};
