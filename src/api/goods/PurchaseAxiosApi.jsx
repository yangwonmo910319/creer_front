import axios from "axios";
import { KH_DOMAIN } from "../../utils/Common";

export const PurchaseAxiosApi = {
  // 구매 목록 추가
  insertPurchase: async (content) => {
console.log("content")
console.log(content)
console.log("content")
    const accessToken = localStorage.getItem("accessToken");
    console.log("구매 회원 토큰 : " + accessToken);
    return await axios.post(KH_DOMAIN + `/api/purchase/new/`, content, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },
};
