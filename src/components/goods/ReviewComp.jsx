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
    font-size: 24px;
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
    overflow: auto;
    flex-direction: column;
    overflow-x: auto;

  }

  li {
    width: 81%;
    display: flex;
    text-align: center;
    flex-direction: row;
    padding: 20px;
    margin: 10px;
    border-radius: 5px;
    height: 100px;
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1); // 상자 그림자 추가
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
      textAlign: "center",
      margin: 0,
      color: "#333",
      fontStyle: "italic",
      width: "100%",
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
  width: 100%;
  height: 40px;
  padding: 10px 25px;
  border: none;
  font-family: "Lato", sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;

`;

const Img = styled.div`
  width: 80px;
  height: 80px;
  color: #333;
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  text-align: center;
  img{
    border: 1px solid rgba(0,0,0,0.2);
    width: 80px;
    margin-top:10px ;
    height: 80px;
  }
`;

const ReviewBox = styled.div`
display: flex;
flex-direction: column;
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
 }
`;


const ReviewDate = styled.p`
width: 50%;
height: 30px;
  color: #999;
  font-size: 14px;
  margin: 0;
  text-align: center; // 텍스트 중앙 정렬
`;
const StarBox = styled.div`

`;
export const ReviewComp = ({ goodsNum }) => {
  const [num , setNum] = useState(goodsNum)
  const [reviews, setReviews] = useState('');
  const [expandedReviews, setExpandedReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const stars = [];
  const [visibleReviews, setVisibleReviews] = useState(10); // 초기에 보여지는 리뷰 개수 설정

  const showMoreReviews = () => {
    setVisibleReviews((prevVisibleReviews) => prevVisibleReviews + 10); // 더 보기 클릭 시 보여지는 리뷰 개수 10개 증가
  };

  for (let i = 1; i <= 5; i++) {
    if (i <= averageRating) {
      stars.push(<FaStar key={i} color="#AAB9FF" />);
    } else if (i - 0.5 <= averageRating) {
      stars.push(<FaStarHalf key={i} color="#AAB9FF" />);
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
      console.log("이펙트");
      console.log(goodsNum);
      fetchReviews();
    }
  }, [goodsNum, fetchReviews]);



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

          <WriteButton onClick={()=>{}}>Review 작성</WriteButton>
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
                   <Img><img src={review.reviewImg}/></Img>  
                   <ReviewBox>
                   <ReviewDate>{review.reviewDate}</ReviewDate>   
                  <Nickname><p>{review.memberDto.nickName}</p></Nickname>    
                         <StarBox>
                  {Array.from({ length: 5 }).map((_, i) => (
                   <span key={i}>
                      {i + 1 <= review.reviewStar ? (
                        <FaStar color="#AAB9FF" />
                      ) : i + 0.5 === review.reviewStar ? (
                        <FaStarHalf color="#AAB9FF" />
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
                  {review.reviewContent.length > 35 && (
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
                  )}
                </div>
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
