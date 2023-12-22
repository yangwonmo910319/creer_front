import styled, { keyframes } from 'styled-components';

// Hover 효과용 Keyframes
const scale = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(.975);
  }
`;





const BtnCss = styled.button`
  appearance: none;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  cursor: pointer;
  width: ${({ width }) => (width ? width : '150px')}; /* 수정된 동적 너비 설정 */
  height: ${({ height }) => (height ? height : '50px')}; /* 수정된 동적 높이 설정 */ background-image: linear-gradient(to top, #b0a3a3);
  border-radius: 30px;
  border: 1px solid rgb(193, 193, 193);
  box-shadow: inset 0 0 0 1px #bfbfbf; /* 수정된 box-shadow 값 */
  transition: box-shadow 0.2s ease, transform 0.2s ease; /* 트랜지션 수정 */
  font-family: "Source Sans Pro", sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #414141;
  /* text-shadow: 0 1px #56f89c; */

  &::-moz-focus-inner {
    border: 0;
  }

  &:hover:not([disabled]) {
    box-shadow: inset 0 0 0 2px #56f89c; /* 수정된 box-shadow 값 */
    transform: scale(0.975); /* 변형 효과 추가 */
    color: #858585;
    & > * {
      transform: scale(.975);
    }
  }

  &:focus:not(:active) {
    animation: ${scale} 0.9s alternate ; /* 수정된 애니메이션 속성 */
    outline: none;
  }

  &:active:not([disabled]) {
    box-shadow: inset 0 0 0 3px #56f89c; /* 수정된 box-shadow 값 */
    transform: scale(0.95); /* 변형 효과 추가 */

    & > * {
      transform: scale(0.95);
    }
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;


export const PublicButton = ({ width, height, text, submit }) => {

  return (
    <BtnCss width={width} height={height} onClick={submit}>
      {text}
    </BtnCss>
  )
}