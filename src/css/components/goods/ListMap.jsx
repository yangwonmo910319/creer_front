import styled, { css } from "styled-components";


export const ListMapCss = styled.div`
   width: 100%;
   height: auto;
   display: flex;
    justify-content: center;
    align-items: center; 
    margin-top: 60px;
`;


export const List = styled.div`
height: auto;
    display: flex;
    justify-content: center;
    align-items: center;

    ul {
      width: 100%;
   height: auto;
   display: flex;
   flex-wrap: wrap;  
   flex-direction: row;
   justify-content: center;
   list-style: none;
   padding: 0;
    li {
      width: 210px;
   height: auto;
   display: flex;
   flex-wrap: wrap;  
   justify-content: center;
   align-items: center;
   margin-left: 20px;
   padding: 10px;  
   padding-top: 0;
      transition: box-shadow 0.3s ease-in-out;
      &:hover {
        box-shadow: 0px 0px 10px 0px rgb(252, 198, 198);
      }

      &:last-child:hover {
        box-shadow: none; /* 마지막 li에 대한 hover 효과 제거 */
      }

      @media (max-width: 768px) {
        width: 230px;
        margin: 0 auto;
        grid-area: option;
      }
    }
  }
`;
export const Class1 = styled.div`

  padding: 0;
   margin: 0 auto;   
   width: 200px;
   color: black;
   height: auto;
   .member{
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    height: 30px;
    margin: 0;
   }

`;

export const Class1img = styled.div`
   width: 200px;
   height: 200px;
   z-index: 1;
   img {
      border-radius: 10px;
      width: 100%;
      height: 100%;
   }
   position: relative;
`;


export const Class1Memberimg = styled.div`
  width: 30px;
   height: 30px;
img{
   border-radius: 50%;
   width: 30px;
   height: 30px;
}
   
`
export const ClassPeice = styled.div`
  color: #2d2d2d;
   width: 100%;
   height: 30px;
   font-size: 1.4em;
   text-align: left;
`;

export const ClassTitle = styled.div`
    width: 100%;  
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    height: 40px; /* 변경 가능한 높이 설정 */
    font-size: 1em;
`;

export const ClassNick = styled.div`
   width: 100%;
   height: 20px;   
   font-size: .8em;
   margin-left: 5px;
`;

export const ClassCategory = styled.div`
  width: 50px;
   font-size: .6em;
   margin-left: 10px;
   border:  1px solid #b7b5b59a;
   text-align: center;
   margin-bottom: -30px;
   z-index: 2;
   position: relative;
   height: 15px;
   background-color:  #ffffff6c;
   border-radius: 10px; 
   display: inline-block;
   max-width: 100%;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
`;