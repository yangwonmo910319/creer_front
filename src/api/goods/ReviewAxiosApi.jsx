import axios from "axios";
import { KH_DOMAIN } from "../../utils/Common";

export const ReviewAxiosApi = {

  // 리뷰 작성
  insertReview: async (   reviewStar, reviewText,num) => {
       const reviewData = {
        goodsDetailId  : num ,
        reviewContent : reviewText,
        reviewStar : reviewStar
    };
    const accessToken = localStorage.getItem("accessToken");
    return await axios.post(KH_DOMAIN + `/api/Review/new/`,reviewData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },

   //리뷰 전부 가져오기
   getReviews: async (num) => {
    console.log("컨트롤");
    console.log(num);
    const accessToken = localStorage.getItem("accessToken");
    return await axios.get(KH_DOMAIN + `/api/Review/list/${num}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },

     //리뷰 한개 삭제
     deleteReview: async (num) => {  
      const accessToken = localStorage.getItem("accessToken");
      return await axios.get(KH_DOMAIN + `/api/Review/delete/${num}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      });
    },
};
