import styled from "styled-components";

export const GoodsInfoCss = styled.div`
margin: 0;
padding: 0;
    width: 65%;
    height: auto;
    @media (max-width: 768px) {
        width: 500px;
        margin: 0 auto;
        grid-area: info; 
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
    height: auto;

  }
`
export const ImgBox = styled.div`
    width: 100%;
    height: auto;
    display: flex;
   justify-content: center;
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
    border: ${(props) => (props.goodsDesc === null || props.goodsDesc.length === 0 ? '3px solid red' : '3px solid  #03bf81')};
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
ul{  
  margin: 0;
padding: 0;
  display: flex;
    li{  
     width: 150px;

     height: 30px;
     display: flex;
     justify-content: center; 
     align-items: center;  
    }
}
`;
export const InfoDescCss = styled.div`
width: 100%; 
border: none;
border-radius: 4px;
font-size: 16px;
height: auto;

img{
  width: 100%; 
  height: auto;
}
`;

export const NewImgBox = styled.div`
width: 100%;
height: auto;
text-align: center;
margin-top: 15px;
img{
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
  color: #787878;
  background-color: #e5e5e5;
  border: 1px solid  #484848;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
  
  &:hover {
    background-color: #6f6f6f;
  }
`;
