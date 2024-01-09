import styled from "styled-components";
export const OptionBoxCss = styled.div`
  width: 100%;
  height: auto;
  ul {
    width: 100%;
    height: auto;
    li {
      width: 100%;
      height: 30px;
      border: 1px solid #7e7e7e;
      padding-left: 10px;
      display: flex;
      align-items: center;
    }
  }
`;

export const Status = styled.div`
  width: 100%;
  height: 30px;
  margin-left: 10px;
  margin-top: 10px;
display:  flex;
flex-direction: row;
.btn{
  display:  flex;
flex-direction: row;
  margin: 0 20px; 
  button{
    margin: 0 5px; 
  }

}
.quantity{
    margin-top: 8px;
  }
`;

export const Check = styled.div`
width: 100%;
height: auto;
border: 2px solid rgba(80, 80, 80, 0.1);
display: flex;
flex-direction: column;
align-items: center;
margin-top: 50px;
background-color: #f2f2f2dc;
padding: 5px;

.check1{
width: 100%;
margin-left: 30px;
margin-top: 10px;
height: 20px;
font-size: 1em;
}
.check2{
  width: 100%;
height: 20px;
font-size: 1.2em;
text-align: end;
margin-right: 20px;
}
.check3{
  margin-top: 5px ;
  width: 100%;
height: auto;
font-size: 1.7em;
text-align: end;
margin-right: 20px;
}
`;
export const OptionContent = styled.div`
margin-top: -20px;
ul{
  margin: 0;
  padding: 0;
}

`;
export const OptionBoxCss1 = styled.div`
  width: 100%;
  font-size: 15px;
  font-weight: normal;
  height: auto;
`;
export const OptionBoxCss2 = styled.div`
  width: 100%;
  height: auto;
`;
export const OptionNum = styled.div`
  width: 100%;
  height: 30px; 
  border: 1px solid #b8b8b8;
  display: flex;
  align-items: center;
  padding-left: 10px;
  font-size: 15px;
  font-weight: normal; /* 또는 다른 원하는 두께 값(normal, bold 등)으로 설정 */
`;

