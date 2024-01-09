import styled, { css } from "styled-components";

export const GoodsOptionCss = styled.div`
  width: 35%;
  height: auto;
  @media (max-width: 768px) {
    width: 500px;
    margin: 0 auto;
    grid-area: option;
  }
`;

export const Seller = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
  display: flex;
  border-bottom: 1px solid rgba(136, 136, 136, 0.673);
  /* justify-content: center; */
  align-items: center;
  margin-top: 20px;
`;

export const Seller1 = styled.div`
  width: 100px;
  height: 100%;
  display: flex;
  /* justify-content: center; */
  align-items: center;
`;

export const Seller2 = styled.div`
  width: calc(100% - 100px);
  display: flex;
  position: relative;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  padding: 10px;
`;
export const Optionimage = styled.div`
  img {
    border-radius: 50px;
    border: 1px solid #a5a5a5;
    width: 100px;
    height: 100px;
    margin-bottom: 40px;
  }
`;
export const OptionNick = styled.div`
  width: 100%;
  position: absolute;
  padding: 10px;
  left: 0;
  top: -25px;
`;
export const OptionCategory = styled.div`

width: 100%;
height: auto;
border: ${(props) => (
    props.goodsCategory === null || props.goodsCategory === undefined || props.goodsCategory.length === 0
      ? '3px solid red' : '3px solid   #03bf81')};
 
.CategoryRaido{
 display: none;
}
&:hover  .CategoryRaido{
  display: block;
}
`;

export const OptionTitleEdit = styled.div`
  width: 100%;
  input {
    width: 93%;
    font-size: 1.5em;
    border: ${(props) =>
    props.goodsTitle === null || props.goodsTitle === undefined || props.goodsTitle.length === 0
      ? "3px solid red"
      : "3px solid   #03bf81"};

    line-height: 1.2em;
    padding-bottom: 20px;
  }
`;
export const Delivery = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  padding-left: 10px;
`;
export const OptionPrice = styled.div`
  width: 100%;
  position: relative;
  margin-top: 20px;
  right: 0;
  font-size: 1.5em;
  margin-right: 100px;
  input {
    width:78%;
    font-size: 1em;
    height: 40px;

    border: ${(props) =>
    props.goodsPrice === null || props.goodsPrice === undefined || props.goodsPrice.length === 0
      ? "3px solid red"
      : "3px solid   #03bf81"};
  }
`;
export const GoodsDeliveryFee = styled.div`
  /* 기본 스타일 */
  font-size: 1em;
  margin-top: 10px;

  /* 조건부 스타일링 */
   ${({ goodsDeliveryFee }) => goodsDeliveryFee === null || goodsDeliveryFee === undefined || goodsDeliveryFee.length === 0 ?

    css`
      input {
        border: 3px solid red;
        /* 추가적인 스타일 */
      }
    ` :
    css`
      input {
        border: 3px solid #03bf81;
        /* 추가적인 스타일 */
      }
    `
  }
`;

export const GoodsStock = styled.div`
  font-size: 1em;
  margin-top: 10px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(136, 136, 136, 0.673);
  width: 100%;
  input {
    font-size: 1em;
    width: 80%;

    border: ${(props) =>
    props.goodsStock === null || props.goodsStock === undefined || props.goodsStock.length === 0
      ? "3px solid red"
      : "3px solid  #03bf81"};
  }
`;

export const Option = styled.div`
  width: 100%;
  height: auto;
  display: flex; 
  flex-direction: row;
  align-items: center;
  justify-content: center;
  button{

    margin: 30px;
  }


`;