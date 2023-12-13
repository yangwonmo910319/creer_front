import axios from "axios";
import { KH_DOMAIN } from "../../utils/Common";

export const GoodsAxiosApi = {
  // 상품 목록 전부 가져오기
  getGoodsList: async () => {
    const accessToken = localStorage.getItem("accessToken");
    return await axios.get(KH_DOMAIN + "/api/goods/list", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },

  // 상품 목록 한개 가져오기
  getGoods: async (id) => {
    const accessToken = localStorage.getItem("accessToken");
    return await axios.get(KH_DOMAIN + `/api/goods/list/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },

  // 상품 삭제
  deleteGoods: async (id) => {
    const accessToken = localStorage.getItem("accessToken");
    return await axios.get(KH_DOMAIN + `/api/goods/delete/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },

  // 상품 수정
  updateGoods: async (goodsCategory, goodsDeliveryFee, goodsDesc, goodsDetailId, goodsPic, goodsPrice, goodsRefund, goodsTitle
  ) => {
    const goodsData = {
      goodsCategory,
      goodsDeliveryFee,
      goodsDesc,
      goodsDetailId,
      goodsPic,
      goodsPrice,
      goodsRefund,
      goodsTitle,
    };
    const accessToken = localStorage.getItem("accessToken");
    return await axios.post(
      KH_DOMAIN + `/api/goods/update/${goodsDetailId}`,
      goodsData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
  },

  // 상품 대표 이미지 넣기
  insertGoodsImg: async (num,newUrl) => {
    const goodsData = {     
      goodsDetailId:num,
      goodsPic: newUrl,
    };
    const accessToken = localStorage.getItem("accessToken");
    return await axios.post(
      KH_DOMAIN + `/api/goods/new/picture/`, goodsData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
  },
  // 상품  이미지 모두 출력
 selectGoodsImg: async (num) => {
    const accessToken = localStorage.getItem("accessToken");
    return await axios.get(
      KH_DOMAIN + `/api/Picture/list/${num}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
  },





  // 상품 추가
  addGoods: async (GoodsToSave) => {
    const response = await axios.post(KH_DOMAIN + "/Goods/admin", GoodsToSave);
    return response;
  },

  // 상품 존재 여부 확인
  isGoodsexist: async (title, author) => {
    const response = await axios.get(
      KH_DOMAIN + `/Goods/isGoodsexist?title=${title}&author=${author}`
    );
    return response;
  },

  // 상품 구매 여부 확인
  isGoodsBought: async (memberId, GoodsId) => {
    const response = await axios.get(
      KH_DOMAIN + `/Goods/isGoodsbought?memberId=${memberId}&GoodsId=${GoodsId}`
    );
    return response;
  },
  // 회원이 구매한 상품 목록
  getBoughtGoods: async (userId) => {
    const response = await axios.get(
      `${KH_DOMAIN}/buy/boughtGoods?memberId=${userId}`
    );
    return response;
  },

  // 상품 삭제
  deleteBuyGoods: async (buyId) => {
    const response = await axios.delete(`${KH_DOMAIN}/buy/${buyId}`);
    return response.data;
  },
  // 상품 정보 가져오기
  getGoodsInfo: async (goodsId) => {
    return await axios.get(`${KH_DOMAIN}/goods/${goodsId}`);
  },
  // 상품 구매
  purchaseGoods: async (memberId, goodsId) => {
    return await axios.post(
      `${KH_DOMAIN}/goods/purchase/${memberId}/${goodsId}`
    );
  },
};
