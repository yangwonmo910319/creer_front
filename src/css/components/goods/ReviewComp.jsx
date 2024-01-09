
import styled from "styled-components";

export const ReivewInfo = styled.div`

width: 100%;
height: auto;
display: flex;
flex-direction: row;

  .review-starbox {
    margin-left: 35px;
    display: flex;
    flex-direction: column;
    width:  50%;

    height: auto;
  
    p{  margin: 0;
      height: 20px;
      text-align: start;
    }
  }

`;
export const ReviewSectionContainer = styled.div`
  height: auto;
  width: 85%; // 너비를 100%로 설정
  max-width: 1200px; // 컨테이너의 최대 너비 설정
  margin: 0 auto; // 좌우 중앙에 배치
 padding: 0;


 
 
  @media screen and (max-width: 768px) {
 
 
  }
  h2 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 15px;
    padding: 10px 0 8px 0;
    text-transform: uppercase; /* 텍스트를 대문자로 변환 */
  }

  .review-rating {
    display: table-cell;
    width:  50%;
    height: 50%;
    text-align: center;
    justify-content: center;
    cursor: default;
    vertical-align: middle; /* 셀 내용 중앙 정렬 */
p{
  margin-top: 10px;
}
  }

  .average-rating {
    font-size: 20px;
    font-weight: bold;
    color: #333;
    color: #007bff; /* 평균 평점의 색상 변경 */
  }

  .star-icons {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 24px;
    justify-content: center; /* 별 아이콘 가운데 정렬 */
  }

  .total-ratings {
    font-size: 14px;
    color: #666;
    margin-top: 10px;
    text-align: right; /* 총 평점을 오른쪽 정렬 */
  }

  ul {

    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
    display: block;
    display: flex;
    text-align: center;  
    flex-direction: column;  
    margin-top: 30px;
  }

  li {
    width: 100%;        
    display: flex;
    text-align: center;
    flex-direction: row;
    border-radius: 5px;
    height: auto;
    border-bottom: 1px solid black;
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.542); // 상자 그림자 추가
    margin-bottom: 10px;
  }

  .review-rating {
    font-weight: bold;
    margin: 0;
    color: #007bff;
  }
`;

export const WriteButton = styled.div`
width: 100%;
height: 60px;  
display: flex;
  justify-content: end;
  align-items: end;

`;

export const MoreButton = styled.div`
  width: 100%;
  height: auto;
  padding-bottom: 10px;
  display: flex;
  justify-content: center;
`;

export const ImgBox = styled.div`
  width: 80px;
  height: 80px;
  color: #333;
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  text-align: center;
  border: 0.7px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  img{
    
    width: 100%;
    height:100%;
  }
`;

export const ImgBox1 = styled.div`
height: aupx;
img{
  border-radius: 50%;
  width: 30px;
  height: 30px;
}
`;
export const TextBox = styled.div`

     width: 90%;
     margin-left: 20px;
  height: auto;
  padding-top: 10px;
  .box3{
    width: 100%;
    height: 30px;
    display: flex;
    flex-direction: row;
  }
`;
export const ReviewBox = styled.div`
display: flex;
flex-direction: row;
height: 130px;
width: 100%;
padding: 0px;
.box1{
  display: flex;
justify-content:center;
align-items: center;

width: 100px;
height: 100px;

}
.box2{
  width: calc(100% - 130px);
  height: auto;
}
`

  ;

export const Nickname = styled.div`
width:100%;
height: auto;
margin: auto;
text-align:start;
`;


export const ReviewContent = styled.div`
width: 90%;
margin-left: 10px;
overflow: hidden;
text-align: start;
height: 20px;
p{
  margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

`;
export const ReviewDate = styled.p`
text-align: start;
width: 100px;
margin: 0;
margin-left: 10px;
height: 20px;
font-size: 12px;

`;
export const StarBox = styled.div`
width: 100%;
text-align: start;
margin: 0;
margin-left: 10px;
height: 100%;
`;
export const DeleteBox = styled.div`
display: flex;
justify-content: center;
align-items: center;
width:20px;
height: 20px;
border-radius: 5px;
font-size: 1.5em;
margin: 0;

border:1px solid #7888ff;
background: white;
right: 0;
p{
  margin-bottom: 30px;
}
`;
