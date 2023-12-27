import axios from "axios";
import { KH_DOMAIN } from "../../utils/Common";

export const PurchaseAxiosApi = {
  // 구매 목록 추가
  insertPurchase: async (content) => {
    const accessToken = localStorage.getItem("accessToken");
    console.log("구매 회원 토큰 : " + accessToken);
    return await axios.post(KH_DOMAIN + `/api/purchase/new/`, content, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },
  // 내 카트 조회
  getMyCart: async () => {
    const accessToken = localStorage.getItem("accessToken");
    return await axios.get(KH_DOMAIN + `/api/purchase/cart`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },

  // 결제 상황 변경
  update: async (id, content) => {
    const accessToken = localStorage.getItem("accessToken");
    console.log("구매 회원 토큰 : " + accessToken);
    return await axios.post(KH_DOMAIN + `/api/purchase/update/${id}/${content}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },



};
