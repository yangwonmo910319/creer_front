import styled from "styled-components";


export const GoodsWriteCss = styled.div`
  display: grid;
  flex-direction: row;
  width: 100%;
  height: auto;
  margin-top: 100px;
  grid-template-columns: 65% 35% ;
     grid-template-rows: auto 100%; 
        grid-template-areas:  
        'L1 R1 '
        'L1 R2';  
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: auto auto auto;
    grid-template-areas:  
        'R1 '
        'L1 '
        'R2 ';  
  }
`;
export const GoodsInfoCss = styled.div`
    width: 100%;
    height: auto;
    grid-area: L1;
 
    @media (max-width: 768px) {
        width: 500px;
        margin: 0 auto;  
    }
   
`;

export const ImgCategory = styled.div`
  width: 95%;
  height: auto;
  display: flex;
   flex-direction: column;
  .ImgCategory1{
    width: 100%;   
    height: 470px;
  }
  .ImgCategory2{
    width: 100%;
    height: 120px;

    display: flex;
  flex-direction: row;
  justify-content: center;

    img{
      margin: 5px;
      border: 1px solid black;
      width: 120px;
    height: 120px;
    padding: 10px;
    }
  }
`
export const ImgBox = styled.div`
    width: 100%;
    height: auto;
    display: flex;
   justify-content: center;
   border: ${(props) => (props.url === null || props.url.length === 0 ? '3px solid red' : '3px solid  #03bf81')};
   .mainImg{ 
        width: 450px;   
        height: auto;
        display: flex;
        justify-content: center;
        img{
          border: 1px solid rgba(171, 171, 171, 0.5);
        width: 400px;
        height: 400px;
    }
    }
    .subImg{
        width: 100px;
        height: auto;
        img{
        width: 80px;
        height: 80px;
    }
    }
`;
export const InfoBox = styled.div`     
       width: 80%;
    height: auto;
border: ${(props) => (props.goodsDesc === null || props.goodsDesc.length == 0 ? '3px solid red' : '3px solid  #03bf81')};
    margin: 20px auto;    
    input{
     width: 90%;  
    }
`;
export const InfoCategory = styled.div`
 margin: 0 auto;
width: 80%;
height: 30px;
margin-top: 50px;
 display: flex;
 justify-content: space-around;
 border:  1px solid rgba(0, 0, 0, 0.192);
 border-left: none;
 border-right: none;
 font-family:Arial;

ul{   margin: 0;
 padding: 0;
  display: flex;
    li{   margin: 0;
 padding: 0;
     width: 150px;
     margin: 0 10%;
     height: 30px;
     display: flex;
     justify-content: center; 
     align-items: center;  
    }
}
`;
export const NewImgBox = styled.div`
width: 100%;
height: auto;
text-align: center;
margin-top: 50px;
img{
  border: 1px solid black;
  padding: 10px;
  width: 150px;
  height: 150px;
}
`;
export const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

export const UploadInput = styled.input`
  display: none;
`;

export const UploadLabel = styled.label`
  display: inline-block;
  padding: 8px 12px;
  color: white;
  background-color: #e5e5e5;
  border: 1px solid  #484848;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
  
  &:hover {
    background-color: #6f6f6f;
  }
`;

export const GoodsOptionCss = styled.div`
    width: 100%;
    height: auto;
      grid-area: R1;
  
    @media (max-width: 768px) {
      width: 500px;
      margin: 0 auto;

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
   height: 100px;
    display: flex;
    /* justify-content: center; */
   align-items: center;
   img{
    width: 100px;
   height: 100px;
   }
 
`;

export const Seller2 = styled.div`

  width:100%;
    display: flex;
    position: relative; 
    flex-direction: column;
    /* justify-content: center; */
   align-items: center;
   padding: 10px;

`;

export const OptionNick = styled.div`
width: 100px;
  position: absolute;
    padding: 10px;
  left: 0;
  top: -25px;
`;
export const OptionCategory = styled.div`

width: 100%;
height: auto;
border: ${(props) => (props.goodsCategory === null || props.goodsCategory.length === 0 ? '3px solid red' : '3px solid   #03bf81')};
.CategoryRaido{
 display: none;
}
&:hover  .CategoryRaido{
  display: block;
}
`;

export const OptionTitleEdit = styled.input`
font-size: 1.5em;
line-height: 1.2em;
padding-bottom: 20px;
 width:100%; 
 height: auto;
border: ${(props) => (props.goodsTitle === null || props.goodsTitle.length === 0 ? '3px solid red' : '3px solid   #03bf81')};
`;
export const Delivery = styled.div`
width: 100%;
position:relative;

 height: auto;
`;
export const OptionPrice = styled.input`
position: relative;
margin-top: 20px;
right:0;
font-size: 1.5em;
margin-right: 100px;
width: 100%;
height: 30px;
border: ${(props) => (props.goodsPrice === null || props.goodsPrice.length === 0 ? '3px solid red' : '3px solid   #03bf81')};
`;
export const GoodsDeliveryFee = styled.input`
font-size: 1em;
margin-top: 15px;
width:100%;
height: 20px;
border: ${(props) => (props.goodsDeliveryFee === null || props.goodsDeliveryFee.length === 0 ? '3px solid red' : '3px solid  #03bf81')};

`;

export const GoodsRefund = styled.input`
font-size: 1em;
margin-top: 15px;
width:100%;
height: 20px;
border: ${(props) => (props.goodsRefund === null || props.goodsRefund.length === 0 ? '3px solid red' : '3px solid  #03bf81')};

`;
export const Option2 = styled.div`
  width: 100%;
  height: auto;
  margin: 0 auto;
  margin-top: 50px;
  display: flex;
  justify-content: center;
@media (max-width: 768px) {
        width: 500px;
      margin: 0 auto;
      grid-area: R2;
      padding-bottom: 10px;
    }
`


export const Option = styled.div`
width: 100%;
height: auto;
display: flex;
flex-direction: column;
align-items: center;
.option1 {
  width: 100%;
    height: auto;
    margin-top: 30px;
}
`;

export const TypeCss = styled.div`
width: 100%;
height: auto;
display: flex;
flex-direction: row;
justify-content:space-around;
margin-bottom: 20px;
`;
