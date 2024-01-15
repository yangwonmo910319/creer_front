import styled from "styled-components";

export const CartPageContainer = styled.div`
  margin: 20px;
  width: 80%;
  max-width: 1280px;

`;

export const GoodsCard = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: end;
  margin: 20px auto;
  width: 80%;
  height: 100px;

  .goodsInfo2 {
    font-size: .8em;
    display: flex;
justify-content: space-between;
align-items: center;
    width: 80%;   
    height: 30%;
    margin-top: 5px;
    .title2{   
      display: flex;
      margin: 10px;
      width: auto;
      flex-wrap: nowrap;
    }
  }
  .goodsInfo {
    display: flex;
justify-content: center;
align-items: center;
    width: 100%;
    height: 70%;
    border-bottom: 1px solid #ddd;
  .goodsImage {
    width: 100px;
    height: 100px;
    margin-top: 50px;
    position: relative;
  }
  .removeButton {

    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
  } 
  div{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .title {
    width: calc(100% - (150px +  10% + 15%));
    height: auto;
    margin-left: 10px;
  }
.quantity{
      flex: none;
    min-width: 30px;
    width: 10%;
}
  .price{
    flex: none;
    min-width: 50px;
    width: 15%;
  }
  img{
    margin-bottom: 20px;
  }
  }
  
`;

