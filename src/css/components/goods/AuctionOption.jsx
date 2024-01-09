import styled, { css } from "styled-components";

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
  height: 25px;
  border-radius: 15px;
  display: flex;
  color: white;
  background: #adadad;
  justify-content: center;
  border: 1px solid  #727272;
`;

export const OptionTitleEdit = styled.div`
  width: 100%;

  font-size: 2em;
  line-height: 1.2em;
  padding-bottom: 20px;
`;

export const Participate = styled.div`

  width: 100%;
  height: auto;
  margin-top: 10px;

  .d1{   margin-top: 20px;

     font-size: 1.3em;
  }
    .d2{  margin-top: 20px;
     font-size: 1.2em;
     display: flex;
     color: #606060;
     flex-direction: column;
     padding-bottom: 20px;
     border-bottom: 1px solid #bfbebe;
  }
    .d3{   
      display: flex;
      justify-content: center;
      margin-top: 20px;
     font-size: 1.3em;
  }
  input {
    margin-top: 10px;
    font-size: .7em;
    height: 30px;
    width: 100%;
  }
`;