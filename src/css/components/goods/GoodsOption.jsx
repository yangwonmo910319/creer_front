import styled from "styled-components";

export const GoodsOptionCss = styled.div`
  width: 35%;
  height: auto;
  @media (max-width: 768px) {
    width: 50%;
    margin: 0 auto;
    grid-area: option;
  }
`;

export const Seller = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  border-bottom: 1px solid rgba(136, 136, 136, 0.673);
  /* justify-content: center; */
  align-items: center;
  margin-top: 20px;
  font-size: .8em;
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
    border: 2px solid #a8a8a8;
    width: 80px;
    height: 80px;
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
  width: 70px;
  height: 20px;
  border-radius: 15px;
  display: flex;
  font-size: .8em;
  color: #000000;
  background: #e3e3e340;
  justify-content: center;
  border: 1px solid  #727272;
`;

export const OptionTitleEdit = styled.div`
  width: 100%;

  font-size: 2em;
  line-height: 1.2em;
  padding-bottom: 20px;
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
    width: 70%;
    font-size: 1em;
    height: 40px;
    border: 2px solid red;
  }
`;
export const GoodsDeliveryFee = styled.div`
  font-size: 1em;
  width: 100%;
  margin-top: 10px;
  input {
    font-size: 1em;
    width: 73%;
    border: 2px solid red;
  }
`;

export const GoodsRefund = styled.div`
  font-size: 1em;
  margin-top: 10px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(136, 136, 136, 0.673);
  width: 100%;
  input {
    font-size: 1em;
    width: 65%;
    border: 2px solid red;
  }
`;

export const Option = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  .option1 {
    width: 90%;
    height: auto;
  }
  .sell {
    display: flex;
    justify-content: space-around;
    width: 60%;
    height: 80px;
    margin: 0;

    .sell1-1,
    .sell1-2 {
      width: 110px;
      height: 80px;
      margin: 10px;
      border-radius: 10px;
      background-color: #fbf3d8;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .sell1-3 {
    border-radius: 10px;
    width: 60%;
    height: 20px;
    background-color: #fbf3d8;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
  }
  .sell1-4 {
    border-radius: 10px;
    width: 60%;
    height: 50px;
    color: white;
    background-color: #f00d33;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
  .sell1-5 {
    margin-top: 10px;
  }
`;