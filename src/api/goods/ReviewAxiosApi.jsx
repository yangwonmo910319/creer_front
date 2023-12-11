import axios from "axios";
import { KH_DOMAIN } from "../../utils/Common";

export const ReviewAxiosApi = {

  // 리뷰 작성
  postReview: async (memberId, goodsId, content, rating) => {
    const reviewData = {
      memberId: memberId,
      goodsId: goodsId,
      content: content,
      rating: rating,
    };
    return await axios.post(`${KH_DOMAIN}/PurchasePage/review`, reviewData);
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
};
