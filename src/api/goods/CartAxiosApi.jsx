import axios from "axios";
import { KH_DOMAIN } from "../../utils/Common";

export const CartAxiosApi = {
  // 장바구니 아이템 가져오기
  getCartItems: async (memberId) => {
    return await axios.get(`${KH_DOMAIN}/CartPage/${memberId}`);
  },
  // 장바구니 아이템 제거
  removeFromCart: async (memberId, goodsId) => {
    return await axios.delete(`${KH_DOMAIN}/CartPage/${memberId}/${goodsId}`);
  },
  // 장바구니 아이템 추가
  addToCart: async (memberId, goodsId) => {
    return await axios.post(`${KH_DOMAIN}/CartPage/add`, { memberId, goodsId });
  },
};
