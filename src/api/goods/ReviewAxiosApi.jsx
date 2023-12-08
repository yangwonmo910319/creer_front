import axios from "axios";
import { KH_DOMAIN } from "../../utils/Common";

export const ReviewAxiosApi = {
  getReviews: async (goodsId) => {
    return await axios.get(`${KH_DOMAIN}/Purchase/reviewdata/${goodsId}`);
  },
  getReviewStats: async (goodsId) => {
    return await axios.get(`${KH_DOMAIN}/Purchase/reviewdata/stats/${goodsId}`);
  },
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
};
