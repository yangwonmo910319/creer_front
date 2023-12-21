import axios from "axios";
import { KH_DOMAIN } from "../../utils/Common";

export const PurchaseAxiosApi = {

  // 구매 목록 추가
  insertPurchase: async (content) => {

    const accessToken = localStorage.getItem("accessToken");
    return await axios.post(
      KH_DOMAIN + `/api/purchase/new/`, content,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
  },
};
