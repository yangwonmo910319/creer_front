import styled, { css } from "styled-components";


const GoodsInfoCss=styled.div`
    width: 65%;
    height: auto;
    border: 3px solid blue;
    @media (max-width: 768px) {
        width: 500px;
        margin: 0 auto;
        grid-area: info; 
    }
   
`;
const ImgBox = styled.div`
    width: 100%;
    height: auto;
    border:  3px solid green;
    display: flex;
   justify-content: center;
    .mainImg{ 
        width: 450px;
        height: auto;
        border:  3px solid red;
        display: flex;
        justify-content: center;
        img{
        width: 400px;
        height: 400px;
    }
    }
    .subImg{
        width: 100px;
        height: auto;
        border:  3px solid red;
        img{
        width: 80px;
        height: 80px;
    }
    }
`;
const InfoBox = styled.div`

       width: 80%;
    height: 500px;
    border:  1px solid black;
    margin: 0 auto;
   margin-top: 10px;
    p{ margin: 0 auto;
         width: 400px;
        text-align: center;
        margin-top: 50px;
    }
`;
const InfoCategory= styled.div`

 margin: 0 auto;
width: 80%;
height: 30px;
margin-top: 50px;
ul{  
     display: flex;
     justify-content: center;
     flex-direction: row;
     flex-wrap: nowrap;
     align-items: center;  
    li{  
     width: 33%;
     height: 30px;
     border:  1px solid black;
     border-radius: 10px;
     display: flex;
     justify-content: center; 
     align-items: center;  
    }
}
`;

export const GoodsInfo=({list})=>{
return(
    <GoodsInfoCss>     
          <ImgBox> 
          <div className="mainImg">  <img src={list[1]}/></div>
          <div className="subImg">  <img src={list[1]}/></div>        
          </ImgBox>
          <InfoCategory>
            <ul>
                <li>소개</li>
                <li>댓글</li>
                <li>판매자</li>
            </ul>
          </InfoCategory>
        <InfoBox>  
            <p> {list[0]} </p>  
           
        </InfoBox>
 
   
    </GoodsInfoCss>
)
}