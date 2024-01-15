import styled from "styled-components";
export const SalseListCss = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
`;
export const Title = styled.div`
    border-bottom: 1px solid black;
  width: 80%;
  height: auto;
  margin: 0 auto;
  font-size: .8em;
  ul{
    height: 30px;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    list-style: none;

    li{
      flex: 1; /* 나머지 항목들에 대해 남은 공간 균등 분배 */
      margin: auto;
      padding: 0;
       display: flex;
    justify-content: center;
    }
    .no{
      flex: none;
      width: 50px; 

    }
    .info{
      flex: none;
      width: 200px;
  
    }
    .img{
        flex: none;
      width: 100px;
  
    }
  }
`;
export const Content = styled.div`
  width: 80%;
  height: auto;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  
`;

export const Goods1 = styled.li`
  display: flex;
  height: 120px;
  align-items: center;
  flex-direction: row;
      border-bottom: 1px solid black;
  div{    
    flex:1; 
    border-top: none;
    display: flex;
  align-items: center;
  justify-content: center;
  }

  .no{
    flex: none;
    width: 50px;
    display: flex;
      flex-direction: column;
            button{
        margin-top: 10px;
      }
  }
    .img{
    flex: none;
    width: 100px;
    img{
    width: 100px;
    height: 100px;
    
  }
  }
`;
export const Goods = styled.ul` 
padding: 0;
  width: 100%;
  height: auto;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
    /* border-bottom: 1px solid black; */
  .title{   
    width: 200px;
    flex:none;
  }
`;
export const Buyer = styled.div`
  width: 100%;
  height: auto;
  margin: 0 auto;   

 
`;
export const Buyer1 = styled.li`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: row;    border-bottom: 1px solid black;
  div{  
    width: 100%;
    height: 30px;


    flex:1; 
    display: flex;
  align-items: center;
  justify-content: center;
  }
  .id{
    flex:none;
    width: 50px;
  }
  .quantity{
   flex:none;
width: 50px;
}
`;

export const Buyer2 = styled.li`
  display: flex;
  width: 100%;

  align-items: center;
  flex-direction: column;
  padding-bottom: 100px;
.buyer2{
  height: auto;
display: flex;
width: 100%;
    border-bottom: 1px solid #d6d6d6;
div{
flex: 1;
display: flex;
justify-content: center;
align-items: center;
}.id{
  flex:none;
width: 50px;
}
.quantity{
   flex:none;
width: 50px;
}
}
  
    
`;