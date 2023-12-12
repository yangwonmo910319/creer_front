import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { FaStar, FaStarHalf } from "react-icons/fa"; // 별 아이콘을 사용하기 위한 import
import { ReviewAxiosApi } from "../../api/goods/ReviewAxiosApi";
import { ReviewModal } from "../../utils/goods/ReviewModal"; 


const ReivewInfo = styled.div`

width: 100%;
height: 50px;
display: flex;
flex-direction: row;

`;
const ReviewSectionContainer = styled.div`
  padding: 0 30px 70px 30px;
  height: auto;
  width: 100%; // 너비를 100%로 설정
  max-width: 1200px; // 컨테이너의 최대 너비 설정
  margin: 0 auto; // 좌우 중앙에 배치

  @media screen and (max-width: 768px) {
    padding: 0 15px 35px 15px; // 화면이 768px 이하일 때 패딩 변경
  }
  h2 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 15px;
    padding: 10px 0 8px 0;
    text-transform: uppercase; /* 텍스트를 대문자로 변환 */
  }

  .review-starbox {
    margin-left: 35px;
    display: flex;
    flex-direction: column;
    width:  50%;
    height: 100px;
    p{
      text-align: start;
    }
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
    width: 90%;        
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
const ReviewText = ({ isExpanded, children }) => (
  <p
    style={{
       width:"90%",
       height:"auto",
      textAlign: "center",
      margin: "0 auto",
      marginTop : "10px",
      color: "#000000",
      fontStyle: "italic",
      overflow: isExpanded ? "visible" : "hidden",
      textOverflow: "ellipsis",
      display: isExpanded ? "block" : "-webkit-box",
      whiteSpace: isExpanded ? "normal" : "nowrap",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: isExpanded ? "none" : 2,
      wordBreak: "break-all",
    }}
  >
    {isExpanded
      ? children
      : children.length <= 35
      ? children
      : children.slice(0, 35) + "..."}
  </p>
);

const WriteButton = styled.button`
width: 100px;
height: 30px;
  position: relative;
  display: inline-block;
  border: 0;
  vertical-align: middle;
  text-decoration: none;
  font-weight: 600;
  color: #382b22;
  background: #fbf3d8;
  border: 1px solid #000000;
  border-radius: 0.75em;
  margin-top: 10px;
`;

const MoreButton = styled.button`
  background-color: #fbf3d8;
  color: black;
  border-radius: 10px;
  position: relative;
  width: 90%;
  height: 40px;
  padding: 10px 25px;
  border: none;
  font-family: "Lato", sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;

`;

const ImgBox = styled.div`
  width: 15%;
  height: auto;
  color: #333;
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  text-align: center;
  margin-left: 30px;
  img{
    width: 80px;
    margin-top:10px ;
    height: 80px;
  }
`;
const TextBox = styled.div`
     width: 85%;
  height: auto;
  min-height:150px ;

`;
const ReviewBox = styled.div`
display: flex;
flex-direction: row;
height: auto;
width: 100%;
p{
  display: flex;
  align-content: center;
  justify-content: center;
  text-align:center;
}
`
;  

const Nickname = styled.div`
width: 100%;
height: auto;

 p{

  color: #333;
  font-size: 18px;
  text-align: center;
  font-weight: bold;
  width: 100%;
  margin: 0;
  margin-top: 10px;
 }
`;


const ReviewContent = styled.div`
width: 100%;
height: 100%;
display: flex;
justify-content: center;
`;
const ReviewDate = styled.p`
width: 100%;
height: auto;
`;
const StarBox = styled.div`
  margin-top: 10px;
`;
const DeleteBox = styled.div`
  width: 60px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  font-size: .5em;
  margin-right:80px;
  margin-top: 10px;
  border-radius: 10px;
  border: 0.1px solid black;
  background: #ffb9b9;
`;

export const ReviewComp = ({ goodsNum ,openReviewModal,openReviewEditModal}) => {
  const [num , setNum] = useState(goodsNum)
  const [render,setRender] = useState(false)
  const [reviews, setReviews] = useState('');
  const [expandedReviews, setExpandedReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const stars = [];
  const [visibleReviews, setVisibleReviews] = useState(10); // 초기에 보여지는 리뷰 개수 설정
  const showMoreReviews = () => {
    setVisibleReviews((prevVisibleReviews) => prevVisibleReviews + 10); // 더 보기 클릭 시 보여지는 리뷰 개수 10개 증가
  };

  // 리뷰 삭제 버튼 클릭시
  const deleteReview = useCallback(async (reviewId) => {   
    try {
    //Axios를 통한 리뷰 삭제 컨트롤 실행 후 결과 받아오기
      const response = await ReviewAxiosApi.deleteReview(reviewId);
    //성공시
      if (response.status === 200) {
        console.log(response)

        //prev[Render]는 React의 useState 또는 setState에서 사용되는 함수 안에서,
        //  해당 상태의 이전 값을 가리키는 변수입니다. 이전 상태값을 안전하게 참조하고 변경 없이 사용하거나 이전 상태를 
        // 기반으로 새로운 상태값을 설정할 때 유용하게 사용됩니다.
        setRender(prevRender => !prevRender);
    //실패시      
      } else {
        console.error("리뷰 삭제 실패");
        console.log(response);
      }
    //에러 발생시
    } catch (error) {
      console.error("리뷰 데이터 요청 에러", error);
    }
  }, []);


  for (let i = 1; i <= 5; i++) {
    if (i <= averageRating) {
      stars.push(<FaStar key={i} color="#fff453"/>);
    } else if (i - 0.5 <= averageRating) {
      stars.push(<FaStarHalf key={i} color="#fff453" />);
    } else {
      stars.push(<FaStar key={i} color="gray" />);
    }
  }
  // 리뷰 데이터를 가져오는 함수
  const fetchReviews = useCallback(async () => {   
    try {
      const response = await ReviewAxiosApi.getReviews(goodsNum);
  
      if (response.status === 200) {
        console.log(response)
        setReviews(response.data);
        //리뷰 수
        setTotalRatings(response.data.length)   
        console.log(response.data.length)
        let totalRating= 0;
        for(let i=0 ; i<response.data.length;i++){
          totalRating += response.data[i].reviewStar;

      }
      setAverageRating(totalRating/response.data.length);
    
      
      } else {
        console.error("리뷰 가져오기 실패");
        console.log(response);
      }
    } catch (error) {
      console.error("리뷰 데이터 요청 에러", error);
    }
  }, [goodsNum]);
  
  useEffect(() => {
    if (goodsNum) {  
      //리뷰 페이지가 있으면 리뷰 가져오기
      fetchReviews();
    }
  }, [goodsNum, fetchReviews,render]);


  return (
    <ReviewSectionContainer>
      <ReviewModal ></ReviewModal>
      <h2>리뷰  {num}</h2>
      <ReivewInfo>
      <div className="review-starbox">
      <p>평균 평점: {averageRating.toFixed(1)}</p>
          <p>{stars}</p>
          <p>리뷰 개수: {totalRatings}</p>
          </div>
        <div className="review-rating">

          <WriteButton onClick={openReviewModal}>Review 작성</WriteButton>
        </div>
   
      </ReivewInfo>
      {/* 리뷰 출력 구간 */}

      <ul className="ReivewUl">
      {(!reviews || reviews.length === 0) ? (
  <li>
    <p>리뷰가 없습니다.</p>
  </li>
) : (     

          reviews.slice(0, visibleReviews).map((review, index) => (
            <li key={index}>  
                <ReviewBox  onClick={openReviewEditModal}>            
                   <ImgBox><img src={review.reviewImg}/></ImgBox>                     
                   <TextBox>
                 <ReviewDate> <p>{review.reviewDate}</p></ReviewDate>
                  <Nickname><p>{review.memberDto.nickName}</p></Nickname>     
                    <DeleteBox onClick={()=>{deleteReview(review.goodsReviewId)}}> 리뷰 삭제 </DeleteBox>
                         <StarBox>
                  {Array.from({ length: 5 }).map((_, i) => (
                   <span key={i}>
                      {i + 1 <= review.reviewStar ? (
                        <FaStar color="#fff453"/>
                      ) : i + 0.5 === review.reviewStar ? (
                        <FaStarHalf color="#fff453" />
                      ) : (
                        <FaStar color="gray" />
                      )}
                    </span>   
                  ))}   </StarBox> 
                <div
                  style={{ width: "100%", height: "100%", overflow: "hidden" }}
                >
             
                  <ReviewText isExpanded={expandedReviews.includes(index)}>
                    {review.reviewContent}
                  </ReviewText>
                  <ReviewContent  >    {review.reviewContent.length > 35 && (
                       <p href="#"onClick={(e) => {e.preventDefault(); // 링크 기본 동작 방지
                        setExpandedReviews((prevExpandedReviews) =>
                          prevExpandedReviews.includes(index)
                            ? prevExpandedReviews.filter((i) => i !== index)
                            : [...prevExpandedReviews, index]
                        );
                      }}
                      style={{
                        marginTop:"10px",
                        color: "#6db4ff", // 링크 색상
                        textDecoration: "none", // 밑줄 없애기
                      }}
                    >
                      {expandedReviews.includes(index)
                        ? "간략히 보기"
                        : "자세히 보기"}
                    </p>
                  )}  </ReviewContent>
                  
                </div>
                </TextBox>
              
                </ReviewBox>             
            </li>
           
          ))
        )}
      </ul>
      {reviews.length > visibleReviews && ( // 더 보기 버튼. 보여지는 리뷰 개수보다 전체 리뷰 개수가 많을 경우에만 보여짐
        <MoreButton className="btn-11" onClick={showMoreReviews}>
          10개 더보기
        </MoreButton>
      )}
        
    </ReviewSectionContainer>
  );
};
